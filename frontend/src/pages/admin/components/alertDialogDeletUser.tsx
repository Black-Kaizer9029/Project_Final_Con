import { Button, Flex, Strong ,Dialog,Text } from "@radix-ui/themes";
import { deleteUser } from "@/services/user.service";

type DialogUserProps ={
    getUserDate: Function;
    user_id: string;
    username: string;
}

const AlertDialogDelete = ({getUserDate, user_id, username}: DialogUserProps) => {
    const handleDeleteCategory = async () => {
        try {
            await deleteUser({
                user_id: user_id
            })
                .then((response) => {
                    if (response.statusCode === 200) {
                        getUserDate();
                    } else if (response.statusCode === 400) {
                        alert(response.message);
                    } else {
                        alert("Unexpected error:" + response.message);
                    }
                }) 
                .catch((error) => {
                    console.error("Error update user", error.response?.date || error.message);
                    alert("Failed to update user. Please try again.");
                });
        }catch (error){
            console.error("Error delete user:", error);
        }
    };

    return (
        <Dialog.Root>
        <Dialog.Trigger>
            <Button className="cursor-pointer" size="1" color="red" variant="soft">Delete</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Delete User</Dialog.Title>
            <Flex direction="column" gap="3">
                <label>
                    <Text size="2"><Strong>Id : </Strong>{user_id}</Text>
                </label>
                <label>
                    <Text size="2"><Strong>Before User Name : </Strong>{username}</Text>
                </label>
            </Flex>
            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button className="cursor-pointer" variant="soft" color="gray">
                    Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button className="cursor-pointer" variant="soft" onClick={handleDeleteCategory} color="red">Delete</Button>
                </Dialog.Close>.
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
    )
}

export default AlertDialogDelete