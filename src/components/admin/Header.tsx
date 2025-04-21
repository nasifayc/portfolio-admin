import { getUser } from "@/auth/server";

import HeaderClient from "./HeaderClient";

async function Header() {
  const user = await getUser();

  return <HeaderClient user={user} />;
}

export default Header;
