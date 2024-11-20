import {Text, Dialog, Button, Flex, TextField, Select} from "@radix-ui/themes";
import { postUser } from "@/services/user.service";
import { useState } from "react";

type DialogUserProps = {
    getUserData: Function;
}
const DialogAdd = ({getUserData} : DialogUserProps) => {
    const [postUserName, setPostUserName] = useState("");
    const [postPassword, setPostPassword] = useState("");
    const [postRole, setPostRole] = useState("");

    const handleCreateUser = async () => {
        if (!postUserName || !postPassword || !postRole) {
        alert("Please enter all required fields (username, password, and role).");
        return;
        }
        postUser({ username: postUserName, password: postPassword, role: postRole })
        .then((response) => {
            if (response.statusCode === 200){
                setPostUserName("");
                setPostPassword("");
                setPostRole("");
                getUserData();
            } else if (response.statusCode === 400) {
                alert( response.message);
            } else {
                alert("Unexpected error:" + response.message);
            }
        })
        .catch((error) => {
            console.error("Error creating category", error.response?.date || error.message);
            alert ("Failed to create user. Please try again.");
        });
    };

    return (
        <Dialog.Root>
        <Dialog.Trigger>
            <Button size="1">Create</Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Create User</Dialog.Title>
            <Flex direction="column" gap="3">
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    Username
                </Text>
                <TextField.Root
                    defaultValue=""
                    placeholder="Enter username"
                    onChange={(event) => setPostUserName (event.target.value)}
                />
            </label>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    Password
                </Text>
                <TextField.Root
                    defaultValue=""
                    placeholder="Enter password"
                    type="password"
                    onChange={(event) => setPostPassword(event.target.value)}
                />
            </label>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                     Role
                </Text>
                <Select.Root size="2" defaultValue="ceo">
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Item value="ceo">CEO</Select.Item>
                        <Select.Item value="admin">ADMIN</Select.Item>
                    </Select.Content>
                </Select.Root>               
            </label>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                     Project
                </Text>
                <Select.Root size="2" defaultValue="project1">
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Item value="project1">PROJECT1</Select.Item>
                        <Select.Item value="project2">PROJECT2</Select.Item>
                    </Select.Content>
                </Select.Root>               
            </label>

            </Flex>
            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray">
                    Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button onClick={handleCreateUser}>Save</Button>
                </Dialog.Close>.
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
    )
};


export default DialogAdd

  