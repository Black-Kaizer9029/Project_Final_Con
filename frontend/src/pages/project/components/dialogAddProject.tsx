import { Text, Dialog, Button, Flex, TextField, Switch } from "@radix-ui/themes";
import { postProject } from "@/services/project.service";
import { useState } from "react";

type DialogProjectProps = {
    getProjectData: Function;
};

const DialogAdd = ({ getProjectData }: DialogProjectProps) => {
    const [projectName, setProjectName] = useState("");
    const [budget, setBudget] = useState("");
    const [status, setStatus] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleCreateProject = async () => {
        if (!projectName || !budget || !startDate || !endDate) {
            alert("Please enter all required fields (project name, budget, start date, and end date).");
            return;
        }

        postProject({ project_name: projectName, budget, status, start_date: startDate, end_date: endDate })
            .then((response) => {
                if (response.statusCode === 200) {
                    // Clear form fields
                    setProjectName("");
                    setBudget("");
                    setStatus(false);
                    setStartDate("");
                    setEndDate("");
                    // Refresh project data
                    getProjectData();
                } else if (response.statusCode === 400) {
                    alert(response.message);
                } else {
                    alert("Unexpected error: " + response.message);
                }
            })
            .catch((error) => {
                console.error("Error creating project", error.response?.data || error.message);
                alert("Failed to create project. Please try again.");
            });
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1">Create</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Create Project</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Project Name
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter project name"
                            onChange={(event) => setProjectName(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Budget
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter budget"
                            type="number"
                            onChange={(event) => setBudget(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Status
                        </Text>
                        <Switch
                            defaultChecked={false}
                            onCheckedChange={(checked) => setStatus(checked)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Start Date
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter start date (YYYY-MM-DD)"
                            type="date"
                            onChange={(event) => setStartDate(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            End Date
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter end date (YYYY-MM-DD)"
                            type="date"
                            onChange={(event) => setEndDate(event.target.value)}
                        />
                    </label>
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleCreateProject}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogAdd;
