import { Dialog, Button, Flex, Strong, Text } from "@radix-ui/themes";
import { deleteResource } from "@/services/resource.service";

interface AlertDialogDeleteResourceProps {
    getResourceData: () => void;
    resource_id: string;
    task_name: string;
    resource_name: string;
}

const AlertDialogDeleteResource: React.FC<AlertDialogDeleteResourceProps> = ({ getResourceData, resource_id, task_name, resource_name }) => {
    const handleDelete = async () => {
        try {
            const response = await deleteResource({ resource_id });
            if (response.statusCode === 200) {
                getResourceData();
            } else {
                alert(response.message || "Unexpected error occurred");
            }
        } catch (error) {
            console.error("Error deleting resource:", error);
            alert("Failed to delete resource. Please try again.");
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button color="red" variant="soft" className="cursor-pointer">Delete</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Delete Resource</Dialog.Title>
                <Flex direction="column" gap="3">
                    <Text size="2"><Strong>Task Name: </Strong>{task_name}</Text>
                    <Text size="2"><Strong>Resource Name: </Strong>{resource_name}</Text>
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button className="cursor-pointer" variant="soft" color="gray">Cancel</Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button className="cursor-pointer" variant="soft" onClick={handleDelete} color="red">Confirm</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default AlertDialogDeleteResource;
