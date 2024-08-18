import { verifySignUp } from '../middleware/verifySignUp.js'
import { signup, signin} from '../controllers/auth.controllers.js'

export default function configureAuthRoutes(app){
    // Se configura el header para CORS
    app.use((req, res, next) =>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    app.post('/api/auth/signup',[verifySignUp.checkUserOrEmail, verifySignUp.checkRoles], signup);
    app.post('/api/auth/signin', signin);
};