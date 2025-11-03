import "dotenv/config";

const getOpenAIAPIResponse = async(messages) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
           model: "gpt-4o-mini",
           messages: messages,
        })
    };
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        //console.log(data.choices[0].message.content);
        if(!response.ok || !data.choices || data.choices.length === 0){
            console.error("OpenAI API Error:",data);
            return "Sorry, I encountered an error during processing.";
        }
        return data.choices[0].message.content ;
    } catch (error) {
        console.log("OpenAI API Fetch Error:",error);
        return "A connection error occurred. Please try again.";
    }
};

export default getOpenAIAPIResponse;