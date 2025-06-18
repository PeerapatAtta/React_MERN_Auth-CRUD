// เก็บ token and username ใน sessionStorage
export const authenticate = (response, next) => {
    if (window !== "undefined") {
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("user", JSON.stringify(response.data.username));
    }
    next();
}

// ดีงข้อมูล token จาก sessionStorage
export const getToken = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("token")) {
            return JSON.parse(sessionStorage.getItem("token"));
        } else {
            return false;
        }
    }
}

// ดีงข้อมูล username จาก sessionStorage
export const getUser = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("user")) {
            return JSON.parse(sessionStorage.getItem("user"));
        } else {
            return false;
        }
    }
}

// logout
export const logout = (next) => {
    if (window !== "undefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    }
    next();
}