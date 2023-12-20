import { useEffect, useState } from "react"
import { FlatList, View } from "react-native";
import { User } from "./User";

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            fetch("https://dummyjson.com/users")
                .then((resp) => resp.json())
                .then((json) => setUsers(json.users))
        })();
    }, [])


    return (
        <View>
            <FlatList data={users}
                keyExtractor={(item) => item.id}
                renderİtem={({ item }) => <User />}
            />
        </View>
    )
}