import axios from "axios";
export default async function annotateCode(code,style="jsdoc"){
   
        const res=await axios.post('http://localhost:4000/api/ai/doc',{
            code:code,
            style:style
        })
const annotate=res.data.code

return annotate;
    
}