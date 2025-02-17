import { useEffect, useState, Fragment } from "react";
import { Card, Table, Text, Flex, Spinner } from "@radix-ui/themes";
import { getResource } from "@/services/resource.service";
import { getTask } from "@/services/task.service";
import { TypeTask } from "@/types/response/response.task";
import { TypeResourceAll } from "@/types/response/response.resource";
import DialogAddResource from "./components/DialogAddResource";
import DialogEditResource from "./components/DialogEditResource";
import AlertDialogDeleteResource from "./components/alertDialogDeleteResource";

export default function ResourcePage() {
    const [groupedResources, setGroupedResources] = useState<{ [task_id: string]: TypeResourceAll[] }>({});
    const [tasks, setTasks] = useState<TypeTask[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getResourceData = async () => {
        setIsLoading(true);
        try {
            const [resTasks, resResources] = await Promise.all([getTask(), getResource()]);

            if (resTasks.success && resResources.success) {
                const tasks: TypeTask[] = resTasks.responseObject;
                const resourceList: TypeResourceAll[] = resResources.responseObject;

                const grouped = tasks.reduce<{ [task_id: string]: TypeResourceAll[] }>((acc, task) => {
                    acc[task.task_id] = resourceList.filter(resource => resource.task_id === task.task_id);
                    return acc;
                }, {});

                setTasks(tasks);
                setGroupedResources(grouped);
            } else {
                console.error("Failed to fetch tasks or resources");
            }
        } catch (error) {
            console.error("Error fetching tasks or resources:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getResourceData();
    }, []);

    return (
        <Card variant="surface">
            <Text size="4" weight="bold">Resources</Text>
            {isLoading ? (
                <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Spinner size="3" />
                </Flex>
            ) : (
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Task ID</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Resource Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Resource Type</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Cost</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.entries(groupedResources).map(([task_id, taskResources]) => {
                            const task = tasks.find(t => t.task_id === task_id);
                            return (
                                <Fragment key={task_id}>
                                    {taskResources.length > 0 ? (
                                        taskResources.map((resource, index) => (
                                            <Table.Row key={resource.resource_id}>
                                                {index === 0 && (
                                                    <>
                                                        <Table.Cell rowSpan={taskResources.length}>{task_id}</Table.Cell>
                                                        <Table.Cell rowSpan={taskResources.length}>
                                                            <Flex direction="row" align="center" gap="2">
                                                                <Text>{task?.task_name}</Text>
                                                            </Flex>
                                                        </Table.Cell>
                                                    </>
                                                )}
                                                <Table.Cell>{resource.resource_name}</Table.Cell>
                                                <Table.Cell>{resource.resource_type}</Table.Cell>
                                                <Table.Cell className="align-left">{new Intl.NumberFormat("en-US").format(resource.cost)}</Table.Cell>
                                                <Table.Cell className="align-left">{new Intl.NumberFormat("en-US").format(resource.quantity)}</Table.Cell>
                                                <Table.Cell className="align-left">{new Intl.NumberFormat("en-US").format(resource.total)}</Table.Cell>
                                                <Table.Cell colSpan={2}>
                                                    <Flex gap="2" align="center">
                                                        <div className="w-[72px] h-[36px] flex items-center justify-center">
                                                            {index === 0 && (
                                                            <DialogAddResource getResourceData={getResourceData} task_id={task_id} />
                                                            )}
                                                        </div>

                                                        <DialogEditResource getResourceData={getResourceData} resource={resource} />
                                                        <AlertDialogDeleteResource
                                                            getResourceData={getResourceData}
                                                            resource_id={resource.resource_id}
                                                            task_name={resource.tasks.task_name}
                                                            resource_name={resource.resource_name}
                                                        />
                                                    </Flex>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    ) : (
                                        <Table.Row>
                                            <Table.Cell>{task_id}</Table.Cell>
                                            <Table.Cell>
                                                <Flex direction="row" align="center" gap="2">
                                                    <Text>{task?.task_name}</Text>
                                                </Flex>
                                            </Table.Cell>
                                            <Table.Cell colSpan={5}>No resources</Table.Cell> 
                                            <Table.Cell>
                                                <Flex gap="2">
                                                    <DialogAddResource getResourceData={getResourceData} task_id={task_id} />
                                                </Flex>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Fragment>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            )}
        </Card>
    );
};

// import { useEffect, useState, Fragment } from "react";
// import { Card, Table, Text, Flex, Spinner } from "@radix-ui/themes";
// import { getResource } from "@/services/resource.service";
// import { getTask } from "@/services/task.service";
// import { TypeTask } from "@/types/response/response.task";
// import { TypeResourceAll } from "@/types/response/response.resource";
// import DialogAddResource from "./components/DialogAddResource";
// import DialogEditResource from "./components/DialogEditResource";
// import AlertDialogDeleteResource from "./components/alertDialogDeleteResource";

// export default function ResourcePage() {
//     const [groupedResources, setGroupedResources] = useState<{ [task_id: string]: TypeResourceAll[] }>({});
//     const [tasks, setTasks] = useState<TypeTask[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     const getResourceData = async () => {
//         setIsLoading(true);
//         try {
//             const [resTasks, resResources] = await Promise.all([getTask(), getResource()]);

//             if (resTasks.success && resResources.success) {
//                 const tasks: TypeTask[] = resTasks.responseObject;
//                 const resourceList: TypeResourceAll[] = resResources.responseObject;

//                 const grouped = tasks.reduce<{ [task_id: string]: TypeResourceAll[] }>((acc, task) => {
//                     acc[task.task_id] = resourceList.filter(resource => resource.task_id === task.task_id);
//                     return acc;
//                 }, {});

//                 setTasks(tasks);
//                 setGroupedResources(grouped);
//             } else {
//                 console.error("Failed to fetch tasks or resources");
//             }
//         } catch (error) {
//             console.error("Error fetching tasks or resources:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         getResourceData();
//     }, []);

//     return (
//         <Card variant="surface">
//             <Text size="4" weight="bold">Resources</Text>
//             {isLoading ? (
//                 <Flex justify="center" align="center" style={{ height: "200px" }}>
//                     <Spinner size="3" />
//                 </Flex>
//             ) : (
//                 <Table.Root variant="surface">
//                     <Table.Header>
//                         <Table.Row>
//                             <Table.ColumnHeaderCell>Task ID</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Resource Name</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Resource Type</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Cost</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
//                         </Table.Row>
//                     </Table.Header>
//                     <Table.Body>
//                         {Object.entries(groupedResources).map(([task_id, taskResources]) => {
//                             const task = tasks.find(t => t.task_id === task_id);
//                             return (
//                                 <Fragment key={task_id}>
//                                     {taskResources.length > 0 ? (
//                                         taskResources.map((resource, index) => (
//                                             <Table.Row key={resource.resource_id}>
//                                                 {index === 0 && (
//                                                     <>
//                                                         <Table.Cell rowSpan={taskResources.length}>{task_id}</Table.Cell>
//                                                         <Table.Cell rowSpan={taskResources.length}>
//                                                             <Flex direction="row" align="center" gap="2">
//                                                                 <Text>{task?.task_name}</Text>
//                                                             </Flex>
//                                                         </Table.Cell>
//                                                     </>
//                                                 )}
//                                                 <Table.Cell>{resource.resource_name}</Table.Cell>
//                                                 <Table.Cell>{resource.resource_type}</Table.Cell>
//                                                 <Table.Cell className="align-left">{new Intl.NumberFormat("en-US").format(resource.cost)}</Table.Cell>
//                                                 <Table.Cell className="align-left">{new Intl.NumberFormat("en-US").format(resource.quantity)}</Table.Cell>
//                                                 <Table.Cell className="align-left">{new Intl.NumberFormat("en-US").format(resource.total)}</Table.Cell>
//                                                 <Table.Cell>
//                                                     <Flex gap="2">
//                                                         <DialogAddResource getResourceData={getResourceData} task_id={task_id} />
//                                                         <DialogEditResource getResourceData={getResourceData} resource={resource} />
//                                                         <AlertDialogDeleteResource 
//                                                             getResourceData={getResourceData} 
//                                                             resource_id={resource.resource_id} 
//                                                             task_name={resource.tasks.task_name}
//                                                             resource_name={resource.resource_name} 
//                                                         />
//                                                     </Flex>
//                                                 </Table.Cell>
//                                             </Table.Row>
//                                         ))
//                                     ) : (
//                                         <Table.Row>
//                                             <Table.Cell>{task_id}</Table.Cell>
//                                             <Table.Cell>
//                                                 <Flex direction="row" align="center" gap="2">
//                                                     <Text>{task?.task_name}</Text>
//                                                 </Flex>
//                                             </Table.Cell>
//                                             <Table.Cell colSpan={5}>No resources</Table.Cell> 
//                                             <Table.Cell>
//                                                 <Flex gap="2">
//                                                     <DialogAddResource getResourceData={getResourceData} task_id={task_id} />
//                                                 </Flex>
//                                             </Table.Cell>
//                                         </Table.Row>
//                                     )}
//                                 </Fragment>
//                             );
//                         })}
//                     </Table.Body>
//                 </Table.Root>
//             )}
//         </Card>
//     );
// };