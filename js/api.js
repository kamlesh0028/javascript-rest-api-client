const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}