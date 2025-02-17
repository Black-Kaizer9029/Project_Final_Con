import { Button, Flex, Strong ,Dialog,Text } from "@radix-ui/themes";
import { deleteProject } from "@/services/project.service";

type DialogProjectProps ={
    getProjectDate: Function;
    project_id: string;
    project_name: string;
}

const AlertDialogDelete = ({getProjectDate, project_id, project_name}: DialogProjectProps) => {
    const handleDeleteProject = async () => {
        try {
            await deleteProject({
                project_id: project_id
            })
                .then((response) => {
                    if (response.statusCode === 200) {
                        getProjectDate();
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
            <Dialog.Title>Delete Project</Dialog.Title>
            <Flex direction="column" gap="3">
                <label>
                    <Text size="2"><Strong>Id : </Strong>{project_id}</Text>
                </label>
                <label>
                    <Text size="2"><Strong>Before Project Name : </Strong>{project_name}</Text>
                </label>
            </Flex>
            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray" className="cursor-pointer">
                    Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button className="cursor-pointer" onClick={handleDeleteProject} color="red" variant="soft">Delete</Button>
                </Dialog.Close>.
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
    )
}

export default AlertDialogDelete