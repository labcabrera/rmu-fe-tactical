const API_TACTICAL_URL= process.env.API_STRATEGIC_URL || "http://localhost:3003/v1" ;
const API_STRATEGIC_URL = process.env.API_STRATEGIC_URL || "http://localhost:3002/v1" ;

export {
    API_TACTICAL_URL,
    API_STRATEGIC_URL
};