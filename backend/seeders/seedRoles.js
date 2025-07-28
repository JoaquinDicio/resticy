import Role from "../models/Role";

async function seedRoles() {
  const roles = ["Admin"];

  for (const roleName of roles) {
    const [role, created] = await Role.findOrCreate({
      where: { name: roleName },
      defaults: { name: roleName },
    });
    if (created) {
      console.log(`Rol '${roleName}' creado`);
    }
  }
}

export default seedRoles;
