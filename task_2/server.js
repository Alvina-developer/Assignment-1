
const http = require("http");
const { randomUUID } = require("crypto");

// Users Array
let users = [
    {
        id: "1",
        name: "ALiya Noor",
        email: "aliya.noor@gmail.com",
        age: 30,
    },
    {
        id: "2",
        name: "Amna Fatima",
        email: "amna.fatima@gmail.com",
        age: 25,
    },
    {
        id: "3",
        name: "Ali Khan",
        email: "ali.khan@gmail.com",
        age: 24,
    },
    {
        id: "4",
        name: "Sara Ahmed",
        email: "sara.ahmed@gmail.com",
        age: 22,
    },
    {
        id: "5",
        name: "Usman Malik",
        email: "usman.malik@gmail.com",
        age: 27,
    }
];

// Helper: Send JSON Response
const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, {
        "Content-Type": "application/json",
    });

    res.end(JSON.stringify(data));
};

// Helper: Read Request Body
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body = body + chunk;
        });

        req.on("end", () => {
            try {
                const data = body ? JSON.parse(body) : {};
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });

        req.on("error", reject);
    });
};

// Create Server
const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    console.log(`[${new Date().toISOString()}] ${method} ${url}`);

    // CREATE USER
    // POST /api/users
    if (method === "POST" && url === "/api/users") {
        try {
            const body = await getRequestBody(req);

            if (
                typeof body.name !== "string" ||
                !body.name.trim() ||
                typeof body.email !== "string" ||
                !body.email.trim() ||
                !Number.isInteger(body.age) ||
                body.age <= 0
            ) {
                return sendResponse(res, 400, {
                    status: false,
                    message: "Valid name, email and age are required",
                });
            }

            const user = {
                id: randomUUID(),
                name: body.name.trim(),
                email: body.email.trim(),
                age: body.age,
            };

            users.push(user);

            return sendResponse(res, 201, {
                status: true,
                message: "User created successfully",
                data: user,
            });

        } catch (error) {
            return sendResponse(res, 400, {
                status: false,
                message: "Invalid JSON",
            });
        }
    }

    // GET ALL USERS
    // GET /api/users
    if (method === "GET" && url === "/api/users") {

        return sendResponse(res, 200, {
            status: true,
            message: "Users fetched successfully",
            totalUsers: users.length,
            data: users,
        });
    }

    // GET SINGLE USER
    // GET /api/users/:id
    if (method === "GET" && url.startsWith("/api/users/")) {

        const id = url.split("/")[3];

        const user = users.find((user) => user.id === id);

        if (!user) {
            return sendResponse(res, 404, {
                status: false,
                message: "User not found",
            });
        }

        return sendResponse(res, 200, {
            status: true,
            message: "User fetched successfully",
            data: user,
        });
    }

    // UPDATE USER
    // PUT /api/users/:id
    if (method === "PUT" && url.startsWith("/api/users/")) {
        try {
            const id = url.split("/")[3];

            const user = users.find((user) => user.id === id);

            if (!user) {
                return sendResponse(res, 404, {
                    status: false,
                    message: "User not found",
                });
            }

            const body = await getRequestBody(req);

            if (
                (body.name !== undefined &&
                    (typeof body.name !== "string" || !body.name.trim())) ||
                (body.email !== undefined &&
                    (typeof body.email !== "string" || !body.email.trim())) ||
                (body.age !== undefined &&
                    (!Number.isInteger(body.age) || body.age <= 0))
            ) {
                return sendResponse(res, 400, {
                    status: false,
                    message: "Invalid user data",
                });
            }

            user.name = body.name ?? user.name;
            user.email = body.email ?? user.email;
            user.age = body.age ?? user.age;

            return sendResponse(res, 200, {
                status: true,
                message: "User updated successfully",
                data: user,
            });

        } catch (error) {
            return sendResponse(res, 400, {
                status: false,
                message: "Invalid JSON",
            });
        }
    }

    // DELETE USER
    // DELETE /api/users/:id
    if (method === "DELETE" && url.startsWith("/api/users/")) {

        const id = url.split("/")[3];

        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return sendResponse(res, 404, {
                status: false,
                message: "User not found",
            });
        }

        const deletedUser = users.splice(userIndex, 1)[0];

        return sendResponse(res, 200, {
            status: true,
            message: "User deleted successfully",
            data: deletedUser,
        });
    }


    // 404 ROUTE
  
    return sendResponse(res, 404, {
        status: false,
        message: "Route not found",
    });

});

// Start Server
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
