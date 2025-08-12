import { Inngest } from "inngest";

export async function POST(req){
    const{serachInput, serachResult, recordId} = await req.json()

    
   const inngestRunId= await inngest.send({
        name: "llm-model",
        data: {
            serachInput: serachInput,
            serachResult: serachResult,
            recordId: recordId
        },
    });

    return NextResponse.json(inngestRunId)
}
