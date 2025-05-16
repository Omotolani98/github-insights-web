'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUserName] = useState<any>(null);
  const [followers, setFollowers] = useState<any>(null);
  const [following, setFollowing] = useState<any>(null);
  const [repos, setRepos] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<any>(null);

  useEffect(() => {
    async function handleCallback() {
      // use token to fetch user data
      const userResponse = await axios.get(
        `http://localhost:52000/v1/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
      const { login, followers, following, public_repos, avatar_url } = userResponse.data.body;
      console.log(avatar_url);
      setUserName(login);
      setFollowers(followers);
      setFollowing(following);
      setRepos(public_repos);
      setAvatarUrl(avatar_url);
    }
    handleCallback()
  }, []);

  // talk to backend callback function with parameters received from the auth provider
  return (
    <>
      <div className="p-25 bg-black-300 h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="grid grid-cols-4 grid-row-1 gap-2 h-full rounded-lg">
          <div className="bg-gradient-to-t from-blue-800 to-black text-white col-span-2 row-span-3 rounded-lg">
            <div className="h-full flex flex-col items-center p-10">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Logo"
                  width={200}
                  height={250}
                  className="rounded-full m-2" />

              ) : <img
                src="/globe.svg"
                alt="Logo"
                width={200}
                height={250}
                className="rounded-full m-2"
              />}

              {/* {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Logo"
                  width={200}
                  height={250}
                  className="rounded-full m-2"
                />
              ) : <Image
                src="/kube.svg"
                alt="Logo"
                width={200}
                height={250}
                className="rounded-full m-2"
              />} */}

              <h1 className="text-3xl">{username}</h1>
              <br /><br />
              <p className="first-letter:float-left first-letter:text-5xl">What is Lorem Ipsum?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                Why do we use it?
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-t from-blue-800 to-black-500 text-white col-span-2 rounded-lg">
            <div className="h-full flex flex-row justify-between p-10">
              <div className="h-full flex flex-col items-center justify-center">
                <p className="text-9xl">{repos}</p>
                <p className="text-4xl">Repos</p>
              </div>
              <div className="h-full flex flex-col items-center justify-center">
                <p className="text-9xl">{repos}</p>
                <p className="text-4xl">Repos</p>
              </div>
              <div className="h-full flex flex-col items-center justify-center">
                <p className="text-9xl">{repos}</p>
                <p className="text-4xl">Repos</p>
              </div>
            </div>

          </div>
          {/* <div className="bg-gradient-to-t from-blue-800 to-black-500 text-white col-span-2 rounded-lg">03</div> */}
          <div className="bg-gradient-to-t from-blue-800 to-black-500 text-white col-span-1 row-span-2 rounded-lg">
            <div className="h-full flex flex-col items-center justify-center">
              <p className="text-9xl">{followers}</p>
              <p className="text-4xl">Followers</p>
            </div>
          </div>
          <div className="bg-gradient-to-t from-blue-800 to-black-500 text-white col-span-1 row-span-2  rounded-lg">
            <div className="h-full flex flex-col items-center justify-center">
              <p className="text-9xl">{following}</p>
              <p className="text-4xl">Following</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
