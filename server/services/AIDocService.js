// import OpenAI from "openai"
// import dotenv from "dotenv"
// dotenv.config()
// export default class AIDocService{
// static async annotateCode(code,style="jsdoc"){
//     if(!code||typeof code!="string"){
//         throw new Error ("Invalid input: 'code is required'")
//     }
//     try{
//  const client=new OpenAI({
//         apiKey:process.env.OPENAI_API_KEY
//     })
//     const formatting={
//         jsdoc:"JSDoc using /** ... */ style",
//         python: "Python docstring using triple quotes"
//     }
//     const formatDescription=formatting[style]
//     const prompt= `You are a senior software engineer.

// Your job:
// Take the provided code and return the SAME CODE
// but with PROFESSIONAL DOCUMENTATION INSERTED ABOVE
// every function, class, and exported symbol.

// Documentation MUST:
//   ✅ High-level description
//   ✅ Parameters + types
//   ✅ Return value
//   ✅ Edge cases
//   ✅ Example usage
//   ✅ Exceptions / errors if relevant

// Rules:
//   ❌ DO NOT rewrite logic
//   ❌ DO NOT rename variables/functions
//   ❌ DO NOT provide line-by-line explanations

// Documentation format: ${formatDescription}

// CODE BELOW:
// ────────────────────────
// ${code}
// ────────────────────────

// Return ONLY annotated code.
//       `;
//       const response=await client.responses.create({
//         model:"gpt-4.1-mini",
//         input:prompt
//       })
//       return response.output[0].content[0].text.trim()

//     }catch(err){
//         console.log("[AIDocService] annotateCode() Error: ",err)
//         throw new Error("Failed to annotate code")

//     }
   
// }
// }

// services/AIDocService.js
import dotenv from "dotenv";
dotenv.config();

export default class AIDocService {
  /**
   * annotateCode
   * ---------------
   * Takes raw code and returns annotated version
   * using DeepSeek model via OpenRouter.
   */
  static async annotateCode(code, style = "jsdoc") {
    if (!code || typeof code !== "string") {
      throw new Error("Invalid input: 'code' is required");
    }

    try {
      const formatting = {
        jsdoc: "JSDoc using /** ... */ style",
        python: "Python docstring using triple quotes",
      };

      const formatDescription = formatting[style];

      // ✅ Prompt Template
      const prompt = `
You are a senior software engineer.

Your job:
Take the provided code and return the SAME CODE
but with PROFESSIONAL DOCUMENTATION INSERTED ABOVE
every function, class, and exported symbol.

Documentation MUST:
  ✅ High-level description
  ✅ Parameters + types
  ✅ Return value
  ✅ Edge cases
  ✅ Example usage
  ✅ Exceptions / errors if relevant

Rules:
  ❌ DO NOT rewrite logic
  ❌ DO NOT rename variables/functions
  ❌ DO NOT provide line-by-line explanations

Documentation format: ${formatDescription}

CODE BELOW:
────────────────────────
${code}
────────────────────────

Return ONLY annotated code.
DO NOT wrap response in markdown (no \`\`\`).DO NOT add language tags like javascript.
Preserve original formatting and line breaks EXACTLY.;`
console.log("API KEY:", process.env.OPENROUTER_API_KEY);
      // ✅ OpenRouter API call
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "arcee-ai/trinity-large-preview:free",
    messages: [
      { role: "user", content: prompt }
    ],
    max_tokens: 800,
    temperature: 0.2
  }),
});
//ollama api
// const response = await fetch("http://localhost:11434/api/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "mistral", // 🔥 you can change to mistral, deepseek-coder, etc.
//           prompt: prompt,
//           stream: false,
//         }),
//       });

if (!response.ok) {
  const text = await response.text();
  console.error("[AIDocService] HTTP error:", response.status, text);
  throw new Error(`OpenRouter HTTP error: ${response.status}`);
}

const data = await response.json();
console.log("[AIDocService] raw data:", data);

const choice = data.choices?.[0]?.message?.content;
if (!choice) {
  console.error("[AIDocService] No content in data.choices", data);
  throw new Error("No response from DeepSeek");
}
 let cleaned=choice.trim();
 cleaned= cleaned.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "");
return cleaned;

      // ✅ Extract AI output
    //   const annotated = data.choices[0].message.content.trim();
    //   return annotated;
    } catch (err) {
      console.error("[AIDocService] annotateCode() Error:", err);
      throw new Error("Failed to annotate code");
    }
  }
  }
