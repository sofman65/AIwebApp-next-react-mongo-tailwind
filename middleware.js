import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";


export default withMiddlewareAuthRequired();


export const congig = {
    matcher: ["/api/chat/:path*", "/chat/:path*"],
};
