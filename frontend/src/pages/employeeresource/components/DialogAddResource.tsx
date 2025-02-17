import { useState } from "react";
import { Dialog, Button, Flex, TextField, Text, Select } from "@radix-ui/themes";
import { postResource } from "@/services/resource.service";

interface DialogAddResourceProps {
    getResourceData: () => void;
    task_id: string;
}

const DialogAddResource: React.FC<DialogAddResourceProps> = ({ getResourceData, task_id }) => {
    const [resourceName, setResourceName] = useState("");
    const [resourceType, setResourceType] = useState("material");
    const [cost, setCost] = useState(0);
    const [quantity, setQuantity] = useState(0);
    // const [total, setTotal] = useState(0);

    const formatNumber = (value: number) => {
        return value.toLocaleString();
    };

    const handleCostChange = (event: any) => {
        const value = event.target.value.replace(/,/g, ""); // Remove commas for parsing
        const numericValue = value === "" ? 0 : Number(value);
        setCost(numericValue);
    };

    const handleQuantityChange = (event: any) => {
        const value = event.target.value.replace(/,/g, ""); // Remove commas for parsing
        const numericValue = value === "" ? 0 : Number(value);
        setQuantity(numericValue);
    };

    const handleAddResource = async () => {
        await postResource({ task_id, resource_name: resourceName, resource_type: resourceType, cost, quantity, total: cost * quantity });
        getResourceData();
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button  variant="soft" className="cursor-pointer">+ Add</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Add Resource</Dialog.Title>
                <Flex direction="column">
                    <label>
                        <Text as="div" size="2" mb="3" weight="bold">
                            Resource Name
                        </Text>
                        <TextField.Root 
                        value={resourceName} 
                        type="text"
                        onChange={(e) => setResourceName(e.target.value)} placeholder="Enter Resource Name" />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="3" mt="3" weight="bold">
                            Resource Type
                        </Text>
                        <Select.Root value={resourceType} onValueChange={setResourceType}>
                            <Select.Trigger className="select-trigger">
                                {resourceType} {/* Display the selected resource type */}
                            </Select.Trigger>

                            <Select.Content>
                                <Select.Item value="material">Material</Select.Item>
                                <Select.Item value="equipment">Equipment</Select.Item>
                                <Select.Item value="worker">Worker</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </label>
                    <label>
                        <Text as="div" size="2" mb="3" mt="3" weight="bold">
                            Cost
                        </Text>
                        <TextField.Root
                        value={formatNumber(cost)}
                        type="text"
                        onChange={handleCostChange} placeholder="Enter Cost" />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="3" mt="3" weight="bold">
                            Quantity
                        </Text>
                        <TextField.Root
                        value={formatNumber(quantity)}
                        type="text"
                        onChange={handleQuantityChange} placeholder="Enter Quantity" />
                    </label>
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button className="cursor-pointer" variant="soft" color="gray" mb="3" mt="3" >
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button className="cursor-pointer" variant="soft" mb="3" mt="3" onClick={handleAddResource}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogAddResource;