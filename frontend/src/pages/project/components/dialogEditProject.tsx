import { Text, Dialog, Button, Flex, TextField, Select } from "@radix-ui/themes";
import { patchProject } from "@/services/project.service";
import { useState } from "react";

type DialogProjectProps = {
    getProjectData: Function;
    project_id: string;
    project_name: string;
    budget: number;
    status: string;
    start_date: string;
    end_date: string;
};

const DialogEdit = ({
    getProjectData,
    project_id,
    project_name,
    budget,
    status,
    start_date,
    end_date,
}: DialogProjectProps) => {
    const [patchProjectName, setPatchProjectName] = useState(project_name);
    const [patchBudget, setPatchBudget] = useState(budget);
    const [formattedBudget, setFormattedBudget] = useState(
        new Intl.NumberFormat("en-US").format(budget)
    ); // Format initial budget
    const [patchStatus, setPatchStatus] = useState(status);
    const [patchStartDate, setPatchStartDate] = useState(start_date);
    const [patchEndDate, setPatchEndDate] = useState(end_date);

    const handleBudgetChange = (event: any) => {
        const value = event.target.value.replace(/,/g, ""); // Remove commas
        const numericValue = value === "" ? 0 : Number(value);
        setPatchBudget(numericValue);
        setFormattedBudget(new Intl.NumberFormat("en-US").format(numericValue));
    };

    const handleUpdateProject = async () => {
        if (!patchProjectName || !patchBudget || !patchStartDate || !patchEndDate) {
            alert("Please enter all required fields (project name, budget, start date, and end date).");
            return;
        }

        patchProject({
            project_id,
            project_name: patchProjectName,
            budget: patchBudget,
            status: patchStatus,
            start_date: patchStartDate,
            end_date: patchEndDate,
        })
            .then((response) => {
                if (response.statusCode === 200) {
                    alert("Project updated successfully!");
                    getProjectData();
                } else if (response.statusCode === 400) {
                    alert(response.message);
                } else {
                    alert("Unexpected error: " + response.message);
                }
            })
            .catch((error) => {
                console.error("Error updating project", error.response?.data || error.message);
                alert("Failed to update project. Please try again.");
            });
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1" color="orange" variant="soft" className="cursor-pointer">
                    Edit
                </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Project</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text size="2">
                            <strong>Project ID: </strong>
                            {project_id}
                        </Text>
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Project Name
                        </Text>
                        <TextField.Root
                            value={patchProjectName}
                            placeholder="Enter project name"
                            onChange={(event) => setPatchProjectName(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Budget
                        </Text>
                        <TextField.Root
                            value={formattedBudget}
                            placeholder="Enter budget"
                            type="text"
                            onChange={handleBudgetChange}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Status
                        </Text>
                        <Select.Root
                            value={patchStatus}
                            onValueChange={(value: string) => setPatchStatus(value)}
                        >
                            <Select.Trigger className="select-trigger">
                                {patchStatus}
                            </Select.Trigger>
                            <Select.Content>
                                <Select.Item value="In progress">In progress</Select.Item>
                                <Select.Item value="Completed">Completed</Select.Item>
                                <Select.Item value="Suspend operations">Suspend operations</Select.Item>
                                <Select.Item value="Project Cancellation">Project Cancellation</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Start Date
                        </Text>
                        <TextField.Root
                            value={patchStartDate}
                            placeholder="Enter start date (YYYY-MM-DD)"
                            type="date"
                            onChange={(event) => setPatchStartDate(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            End Date
                        </Text>
                        <TextField.Root
                            value={patchEndDate}
                            placeholder="Enter end date (YYYY-MM-DD)"
                            type="date"
                            onChange={(event) => setPatchEndDate(event.target.value)}
                        />
                    </label>
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button className="cursor-pointer" variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Button onClick={handleUpdateProject} color="orange"  variant="soft" className="cursor-pointer">
                        Update
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default DialogEdit;
