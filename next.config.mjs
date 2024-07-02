/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    swcMinify:true,
    async rewrites(){
        return[
            {
            // /api/login 으로 시작되는 모든 요청 Spring Boot의 /api/login 으로 리 라이트 된다.
            source : "/api/login",
            destination : "http://localhost:8080/api/login"
            },
            {
                source : "/api/logout",
                destination : "http://localhost:8080/api/logout"
            },
            {
                source : "/api/admin",
                destination : "http://localhost:8080/api/admin"
            },
            {
                source : "/api/userInfo",
                destination : "http://localhost:8080/api/userInfo"
            },
            {
                source : "/api/infoEdit",
                destination : "http://localhost:8080/api/infoEdit"
            },
            {
                source : "/api/changePassword",
                destination : "http://localhost:8080/api/changePassword"
            },
            {
                source : "/api/joinUser",
                destination : "http://localhost:8080/api/joinUser"
            },
            {
                source : "/api/freeBoard",
                destination : "http://localhost:8080/api/freeBoard"
            },
            {
                source : "/api/freeBoardDetail",
                destination : "http://localhost:8080/api/freeBoardDetail"
            },
            {
                source : "/api/writeFreeboard",
                destination : "http://localhost:8080/api/writeFreeboard"
            },
            {
                source : "/api/tradeboard",
                destination : "http://localhost:8080/api/tradeboard"
            },
            {
                source : "/api/detailTrade",
                destination : "http://localhost:8080/api/detailTrade"
            },
            {
                source : "/api/writeTrade",
                destination : "http://localhost:8080/api/writeTrade"
            },
            {
                source : "/api/deleteTrade",
                destination : "http://localhost:8080/api/deleteTrade"
            },
            {
                source : "/api/updateTrade",
                destination : "http://localhost:8080/api/updateTrade"
            },
            {
                source : "/api/public",
                destination : "http://localhost:8080/api/publi"
            },
            {
                source : "/api/upload",
                destination : "http://localhost:8080/api/upload"
            }
        ];
    }

    
};

export default nextConfig;
