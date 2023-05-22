import Cookies from "js-cookie";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "solid-start";
import NotLoggedIn from "~/components/NotLoggedIn";
import { getAuth } from "~/functions/getAuth";

export default function Page() {
  const nav = useNavigate();

  const [auth, setAuth] = createStore({
    loggedin: false,
    user: {
      username: "",
      displayname: "",
      email: "",
      imgurl: "",
    }
  });
  //const [auth] = createResource(getAuth);
  createEffect(async () => {
    setAuth(await getAuth(Cookies.get("auth")));
    if (auth.loggedin == false) {
      nav("/login")
    }
  });

  return (
    <>
      {auth ?
        <>
          <ul>
            <img src={auth.user.imgurl}/>
            {auth.user.displayname}
          </ul>
        </>
        :
        <NotLoggedIn />
      }
    </>
  );
}

