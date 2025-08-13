import { inngest } from "./client";
import {supabase} from '@/services/supabase'


export const llmModel = inngest.createFunction(
  {id: 'llm-model'},
  {event: 'llm-model'},
  async({event, step}) =>{

    const aiResp = await step.ai.infer('generate-ai-llm-model-call', {
      model: step.ai.models.gemini({
        model: 'gemini-2.0-flash',
        apiKey: process.env.GEMINI_API_KEY
      }),
      body:{
        contents:[
          {
            role: 'model',
            parts:[
              {
                text: 'Depends on user input sources, Summarize and search about topics, Give a markdown text with proper formatting. User Input is: ' +event.data.searchInput
              }
            ]
          },
          {
              role: 'user',
              parts:[
                {
                  text: JSON.stringify(event.data.searchResult)
                }
              ]
          }

        ]
      }
    })
    const saveToDb = await step.run('saveToDb', async() =>{

      const { data, error } = await supabase
        .from('Chats')
        .update({ aiResp: aiResp?.candidates[0].content.parts[0].text })
        .eq('id', event.data.recordId)
        .select()
          
     
      if (error) throw error;
      return data;
    });

    return {
      aiText: aiResp?.candidates?.[0]?.content?.parts?.[0]?.text,
      recordId: event.data.recordId,
    };
  }
);