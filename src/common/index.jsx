

// const backendDomain = "https://ai-webdeveloper-backend.onrender.com"
const backendDomain = "http://localhost:3000"

const SummaryApi ={
    sendEmail:{
        url:`${backendDomain}/sendEmail`,
        method:"post",
    }
}
export default SummaryApi
