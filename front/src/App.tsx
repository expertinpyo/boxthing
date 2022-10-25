/** @jsxImportSource @emotion/react */

import { useEffect } from "react"
import "./App.css"
import Header from "./component/Header/Header"
import Nav from "./component/Nav/Nav"
import { css } from "@emotion/react"
import PlanContent from "./component/Content/PlanContent"
import { atom, useSetRecoilState } from "recoil"
import GitBox from "./component/Box/GitBox"
import PlanBox from "./component/Box/PlanBox"
import WorkBox from "./component/Box/WorkBox"
import HealthBox from "./component/Box/HealthBox"
import StretchingModal from "./component/Modal/StretchingModal"
import { useState } from "react"

const timeState = atom({
  key: "timeState",
  default: new Date(),
})

const planListState = atom({
  key: "planListState",
  default: [
    {
      kind: "calendar#event",
      etag: '"3333189635762000"',
      id: "5curjtaj80idbjt1i46vtgimfq",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=NWN1cmp0YWo4MGlkYmp0MWk0NnZ0Z2ltZnEgZGlkbmxpZUBt",
      created: "2022-10-24T07:00:17.000Z",
      updated: "2022-10-24T07:00:17.881Z",
      summary: "뭐냐뭐냐",
      description: "뭐냐뭐냐설명",
      creator: {
        email: "didnlie@gmail.com",
        self: true,
      },
      organizer: {
        email: "didnlie@gmail.com",
        self: true,
      },
      start: {
        dateTime: "2022-10-24T16:15:00+09:00",
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: "2022-10-24T16:45:00+09:00",
        timeZone: "Asia/Seoul",
      },
      iCalUID: "5curjtaj80idbjt1i46vtgimfq@google.com",
      sequence: 0,
      reminders: {
        useDefault: true,
      },
      eventType: "default",
    },
    {
      kind: "calendar#event",
      etag: '"3333189684532000"',
      id: "3q67nteuc6h3jn6o7jljokfdr9",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=M3E2N250ZXVjNmgzam42bzdqbGpva2ZkcjkgZGlkbmxpZUBt",
      created: "2022-10-24T07:00:42.000Z",
      updated: "2022-10-24T07:00:42.266Z",
      summary: "냐뭐냐뭐",
      description: "냐뭐냐뭐설명",
      creator: {
        email: "didnlie@gmail.com",
        self: true,
      },
      organizer: {
        email: "didnlie@gmail.com",
        self: true,
      },
      start: {
        dateTime: "2022-10-24T17:00:00+09:00",
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: "2022-10-24T18:00:00+09:00",
        timeZone: "Asia/Seoul",
      },
      iCalUID: "3q67nteuc6h3jn6o7jljokfdr9@google.com",
      sequence: 0,
      reminders: {
        useDefault: true,
      },
      eventType: "default",
    },
    {
      kind: "calendar#event",
      etag: '"3333189719942000"',
      id: "5kdtfcmv5qhuj6qas12need0ct",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=NWtkdGZjbXY1cWh1ajZxYXMxMm5lZWQwY3QgZGlkbmxpZUBt",
      created: "2022-10-24T07:00:59.000Z",
      updated: "2022-10-24T07:00:59.971Z",
      summary: "킹뭐킹뭐",
      description: "킹뭐킹뭐",
      creator: {
        email: "didnlie@gmail.com",
        self: true,
      },
      organizer: {
        email: "didnlie@gmail.com",
        self: true,
      },
      start: {
        dateTime: "2022-10-24T16:30:00+09:00",
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: "2022-10-24T17:30:00+09:00",
        timeZone: "Asia/Seoul",
      },
      iCalUID: "5kdtfcmv5qhuj6qas12need0ct@google.com",
      sequence: 0,
      reminders: {
        useDefault: true,
      },
      eventType: "default",
    },
  ],
})

const notiListState = atom({
  key: "notiListState",
  default: [
    {
      id: "1",
      repository: {
        id: 1296269,
        node_id: "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
        name: "Hello-World",
        full_name: "octocat/Hello-World",
        owner: {
          login: "octocat",
          id: 1,
          node_id: "MDQ6VXNlcjE=",
          avatar_url: "https://github.com/images/error/octocat_happy.gif",
          gravatar_id: "",
          url: "https://api.github.com/users/octocat",
          html_url: "https://github.com/octocat",
          followers_url: "https://api.github.com/users/octocat/followers",
          following_url:
            "https://api.github.com/users/octocat/following{/other_user}",
          gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/octocat/subscriptions",
          organizations_url: "https://api.github.com/users/octocat/orgs",
          repos_url: "https://api.github.com/users/octocat/repos",
          events_url: "https://api.github.com/users/octocat/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/octocat/received_events",
          type: "User",
          site_admin: false,
        },
        private: false,
        html_url: "https://github.com/octocat/Hello-World",
        description: "This your first repo!",
        fork: false,
        url: "https://api.github.com/repos/octocat/Hello-World",
        archive_url:
          "https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
        assignees_url:
          "https://api.github.com/repos/octocat/Hello-World/assignees{/user}",
        blobs_url:
          "https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/octocat/Hello-World/branches{/branch}",
        collaborators_url:
          "https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/octocat/Hello-World/comments{/number}",
        commits_url:
          "https://api.github.com/repos/octocat/Hello-World/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/octocat/Hello-World/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/octocat/Hello-World/contributors",
        deployments_url:
          "https://api.github.com/repos/octocat/Hello-World/deployments",
        downloads_url:
          "https://api.github.com/repos/octocat/Hello-World/downloads",
        events_url: "https://api.github.com/repos/octocat/Hello-World/events",
        forks_url: "https://api.github.com/repos/octocat/Hello-World/forks",
        git_commits_url:
          "https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
        git_refs_url:
          "https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
        git_tags_url:
          "https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
        git_url: "git:github.com/octocat/Hello-World.git",
        issue_comment_url:
          "https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
        issues_url:
          "https://api.github.com/repos/octocat/Hello-World/issues{/number}",
        keys_url:
          "https://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
        labels_url:
          "https://api.github.com/repos/octocat/Hello-World/labels{/name}",
        languages_url:
          "https://api.github.com/repos/octocat/Hello-World/languages",
        merges_url: "https://api.github.com/repos/octocat/Hello-World/merges",
        milestones_url:
          "https://api.github.com/repos/octocat/Hello-World/milestones{/number}",
        notifications_url:
          "https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
        pulls_url:
          "https://api.github.com/repos/octocat/Hello-World/pulls{/number}",
        releases_url:
          "https://api.github.com/repos/octocat/Hello-World/releases{/id}",
        ssh_url: "git@github.com:octocat/Hello-World.git",
        stargazers_url:
          "https://api.github.com/repos/octocat/Hello-World/stargazers",
        statuses_url:
          "https://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
        subscribers_url:
          "https://api.github.com/repos/octocat/Hello-World/subscribers",
        subscription_url:
          "https://api.github.com/repos/octocat/Hello-World/subscription",
        tags_url: "https://api.github.com/repos/octocat/Hello-World/tags",
        teams_url: "https://api.github.com/repos/octocat/Hello-World/teams",
        trees_url:
          "https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
        hooks_url: "http://api.github.com/repos/octocat/Hello-World/hooks",
      },
      subject: {
        title: "Greetings",
        url: "https://api.github.com/repos/octokit/octokit.rb/issues/123",
        latest_comment_url:
          "https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
        type: "Issue",
      },
      reason: "subscribed",
      unread: true,
      updated_at: "2014-11-07T22:01:45Z",
      last_read_at: "2014-11-07T22:01:45Z",
      url: "https://api.github.com/notifications/threads/1",
      subscription_url:
        "https://api.github.com/notifications/threads/1/subscription",
    },
  ],
})

const boxes = [<PlanBox />, <GitBox />, <WorkBox />, <HealthBox />]

function App() {
  const [open, setOpen] = useState(false)

  const setCurrentTime = useSetRecoilState(timeState)

  const handleResize = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    let timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(timer)
    }
  }, [setCurrentTime])

  return (
    <div className="App">
      {/* <div
        css={css`
          width: 12.5%;
          height: 100%;
        `}
      >
        <Nav></Nav>
      </div>
      <div
        css={css`
          width: 87.5%;
          height: 100%;
        `}
      >
        <Header></Header>
        <PlanContent></PlanContent>
      </div> */}
      {/* <PlanBox></PlanBox> */}
      {/* <GitBox></GitBox> */}
      <StretchingModal open={open}></StretchingModal>
      <button
        onClick={() => {
          setOpen(!open)
        }}
      ></button>
    </div>
  )
}

export { App, timeState, planListState, notiListState }
