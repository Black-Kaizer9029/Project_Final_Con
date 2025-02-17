// import {Text, Dialog, Button, Flex, TextField,Strong} from "@radix-ui/themes";
// import { patchUser } from "@/services/user.service";
// import { useState } from "react";
// // import { error } from "console";
// // import { eventNames } from "process";

// type DialogUserProps = {
//     getUserData: Function;
//     user_id: string;
//     username: string;
//     role: string;

// }
// const DialogEdit = ({getUserData ,user_id ,username, role} : DialogUserProps) => {
//     const [patchUserName, setpatchUserName] = useState("");

//     const handleUpdateUser = async () => {
//         if (!patchUserName) {
//         alert("Please enter a username.");
//         return;
//         }

//         patchUser({
//              user_id: user_id,
//              username: patchUserName, 
//              role : role,
//             })

//             .then((response) => {
//                 if (response.statusCode === 200){
//                     setpatchUserName("");
//                     getUserData();
//                 } else if (response.statusCode === 400) {
//                     alert( response.message);
//                 } else {
//                     alert("Unexpected error:" + response.message);
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error updating user", error.response?.date || error.message);
//                 alert ("Failed to update user. Please try again.");
//             });
//     };
    
//     return (
//         <Dialog.Root>
//         <Dialog.Trigger>
//             <Button size="1" color="orange" variant="soft">Edit</Button>
//         </Dialog.Trigger>

//         <Dialog.Content maxWidth="450px">
//             <Dialog.Title>Edit User</Dialog.Title>
//             <Flex direction="column" gap="3">
//                 <label>
//                     <Text size="2"><Strong>Id : </Strong>{user_id}</Text>
//                 </label>
//                 <label>
//                     <Text size="2"><Strong>Current Username : </Strong>{username}</Text>
//                 </label>
//             <label>
//                 <Text as="div" size="2" mb="1" weight="bold">
//                     New Username
//                 </Text>
//                 <TextField.Root
//                     defaultValue=""
//                     placeholder="Enter your category name"
//                     onChange={(event) => setpatchUserName (event.target.value)}
//                 />
//             </label>
//             </Flex>
//             <Flex gap="3" mt="4" justify="end">
//                 <Dialog.Close>
//                     <Button variant="soft" color="gray">
//                     Cancel
//                     </Button>
//                 </Dialog.Close>
//                 <Dialog.Close>
//                     <Button onClick={handleUpdateUser}>Edit</Button>
//                 </Dialog.Close>.
//             </Flex>
//         </Dialog.Content>
//     </Dialog.Root>
//     )
// };


// export default DialogEdit

import { Text, Dialog, Button, Flex, TextField, Strong, Select } from "@radix-ui/themes";
import { patchUser } from "@/services/user.service";
import { getRole } from "@/services/role.service";
import { getProject } from "@/services/project.service";
import { useState, useEffect } from "react";

type DialogUserProps = {
  getUserData: Function;
  user_id: string;
  username: string;
  role: string;
  project: string;
};

const DialogEdit = ({ getUserData, user_id, username, role, project }: DialogUserProps) => {
  const [patchUserName, setPatchUserName] = useState(username);
  const [patchPassword, setPatchPassword] = useState("");
  const [patchRole, setPatchRole] = useState(role);
  const [patchProject, setPatchProject] = useState(project);
  const [roles, setRoles] = useState<{ role_id: string; name: string }[]>([]);
  const [projects, setProjects] = useState<{ project_id: string; project_name: string }[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Fetch roles on component load
  useEffect(() => {
    const fetchRoles = async () => {
      setLoadingRoles(true);
      try {
        const response = await getRole();
        console.log("Roles:", response.responseObject);
        if (response.success) {
          setRoles(response.responseObject);
        } else {
          alert("Failed to fetch roles: " + response.message);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        alert("Error fetching roles. Please try again.");
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  // Fetch projects on component load
  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await getProject();
        console.log("Projects:", response.responseObject);
        if (response.success) {
          setProjects(response.responseObject);
        } else {
          alert("Failed to fetch projects: " + response.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert("Error fetching projects. Please try again.");
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const handleUpdateUser = async () => {
    if (!patchUserName || !patchRole || !patchProject) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await patchUser({
        user_id,
        username: patchUserName,
        password: patchPassword || undefined, // Only update password if provided
        role: patchRole || undefined,
        project_id: patchProject || undefined ,
      });
      if (response.statusCode === 200) {
        getUserData(); // Refresh user data
        alert("User updated successfully!");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="cursor-pointer" size="1" color="orange" variant="soft">
          Edit
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit User</Dialog.Title>
        <Flex direction="column" gap="3">
          {/* User ID */}
          <label>
            <Text size="2">
              <Strong>ID: </Strong>
              {user_id}
            </Text>
          </label>
          {/* Current Username */}
          <label>
            <Text size="2">
              <Strong>Current Username: </Strong>
              {username}
            </Text>
          </label>
          {/* New Username */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              New Username
            </Text>
            <TextField.Root
              value={patchUserName}
              placeholder="Enter new username"
              onChange={(event) => setPatchUserName(event.target.value)}
            />
          </label>
          {/* Password */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              value={patchPassword}
              type="password"
              placeholder="Enter new password (optional)"
              onChange={(event) => setPatchPassword(event.target.value)}
            />
          </label>
          {/* Role */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Role
            </Text>
            {loadingRoles ? (
              <Text>Loading roles...</Text>
            ) : (
              <Select.Root
                size="2"
                value={patchRole}
                onValueChange={(value) => setPatchRole(value)}
              >
                <Select.Trigger>
                  {roles.find((role) => role.name === patchRole)?.name || "Select a role"}
                </Select.Trigger>
                <Select.Content>
                  {roles.map((role) => (
                    <Select.Item key={role.role_id} value={role.name}>
                      {role.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          </label>
          {/* Project */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Project
            </Text>
            {loadingProjects ? (
              <Text>Loading projects...</Text>
            ) : (
              <Select.Root
                size="2"
                value={patchProject}
                onValueChange={(value) => setPatchProject(value)}
              >
                <Select.Trigger>
                  {projects.find((project) => project.project_id === patchProject)?.project_name ||
                    "Select a project"}
                </Select.Trigger>
                <Select.Content>
                  {projects.map((project) => (
                    <Select.Item key={project.project_id} value={project.project_id}>
                      {project.project_name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button className="cursor-pointer" variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button className="cursor-pointer" variant="soft" color="orange" onClick={handleUpdateUser}>Update</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogEdit;

// import { Text, Dialog, Button, Flex, TextField, Strong, Select } from "@radix-ui/themes";
// import { patchUser } from "@/services/user.service";
// import { getRole } from "@/services/role.service";
// import { getProject } from "@/services/project.service";
// import { useState, useEffect } from "react";

// type DialogUserProps = {
//   getUserData: Function;
//   user_id: string;
//   username: string;
//   role: string;
//   project: string | null;
// };

// const DialogEdit = ({ getUserData, user_id, username, role, project }: DialogUserProps) => {
//   const [patchUserName, setPatchUserName] = useState(username);
//   const [patchPassword, setPatchPassword] = useState("");
//   const [patchRole, setPatchRole] = useState(role);
//   const [patchProject, setPatchProject] = useState(project || null);
//   const [roles, setRoles] = useState<{ role_id: string; name: string }[]>([]);
//   const [projects, setProjects] = useState<{ project_id: string; project_name: string }[]>([]);
//   const [loadingRoles, setLoadingRoles] = useState(false);
//   const [loadingProjects, setLoadingProjects] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // Fetch roles
//   useEffect(() => {
//     const fetchRoles = async () => {
//       setLoadingRoles(true);
//       try {
//         const response = await getRole();
//         if (response.success) setRoles(response.responseObject);
//       } catch (error) {
//         console.error("Error fetching roles:", error);
//       } finally {
//         setLoadingRoles(false);
//       }
//     };
//     fetchRoles();
//   }, []);

//   // Fetch projects
//   useEffect(() => {
//     const fetchProjects = async () => {
//       setLoadingProjects(true);
//       try {
//         const response = await getProject();
//         if (response.success) setProjects(response.responseObject);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       } finally {
//         setLoadingProjects(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const handleUpdateUser = async () => {
//     if (!patchUserName || !patchRole) {
//       alert("Username and Role are required.");
//       return;
//     }
  
//     try {
//       const response = await patchUser({
//         user_id,
//         username: patchUserName,
//         password: patchPassword || undefined,
//         role: patchRole, // Ensure this is `role_id`
//         project_id: patchProject || undefined,
//       });
//       if (response.success) {
//         alert("User updated successfully!");
//         getUserData();
//       } else {
//         alert(response.message);
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert("Failed to update user. Please try again.");
//     }
//   };

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger>
//         <Button size="1" color="orange" variant="soft">
//           Edit
//         </Button>
//       </Dialog.Trigger>
//       <Dialog.Content maxWidth="450px">
//         <Dialog.Title>Edit User</Dialog.Title>
//         <Flex direction="column" gap="3">
//           <Text size="2">
//             <Strong>ID: </Strong>
//             {user_id}
//           </Text>
//           <label>
//             <Text size="2" weight="bold">New Username</Text>
//             <TextField.Root
//               value={patchUserName}
//               placeholder="Enter new username"
//               onChange={(e) => setPatchUserName(e.target.value)}
//             />
//           </label>
//           <label>
//             <Text size="2" weight="bold">Password</Text>
//             <TextField.Root
//               value={patchPassword}
//               type="password"
//               placeholder="Optional: Enter new password"
//               onChange={(e) => setPatchPassword(e.target.value)}
//             />
//           </label>
//           <label>
//             <Text size="2" weight="bold">Role</Text>
//             {loadingRoles ? (
//               <Text>Loading roles...</Text>
//             ) : (
//               <Select.Root
//                 value={patchRole}
//                 onValueChange={setPatchRole}
//               >
//                 <Select.Trigger>{roles.find(r => r.role_id === patchRole)?.name || "Select Role"}</Select.Trigger>
//                 <Select.Content>
//                   {roles.map((role) => (
//                     <Select.Item key={role.role_id} value={role.role_id}>
//                       {role.name}
//                     </Select.Item>
//                   ))}
//                 </Select.Content>
//               </Select.Root>
//             )}
//           </label>
//           <label>
//             <Text size="2" weight="bold">Project</Text>
//             {loadingProjects ? (
//               <Text>Loading projects...</Text>
//             ) : (
//               <Select.Root
//                 value={patchProject || "none"}
//                 onValueChange={(value) => setPatchProject(value === "none" ? null : value)}
//               >
//                 <Select.Trigger>
//                   {patchProject
//                     ? projects.find((proj) => proj.project_id === patchProject)?.project_name || "Select Project"
//                     : "No Project"}
//                 </Select.Trigger>
//                 <Select.Content>
//                   <Select.Item value="none">No Project</Select.Item>
//                   {projects.map((proj) => (
//                     <Select.Item key={proj.project_id} value={proj.project_id}>
//                       {proj.project_name}
//                     </Select.Item>
//                   ))}
//                 </Select.Content>
//               </Select.Root>
//             )}
//           </label>
//         </Flex>
//         <Flex gap="3" justify="end" mt="4">
//           <Dialog.Close>
//             <Button variant="soft" color="gray">Cancel</Button>
//           </Dialog.Close>
//           <Button onClick={handleUpdateUser} disabled={saving}>
//             {saving ? "Saving..." : "Save"}
//           </Button>
//         </Flex>
//       </Dialog.Content>
//     </Dialog.Root>
//   );
// };

// export default DialogEdit;
