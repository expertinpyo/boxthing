import { atom, selector } from "recoil"
import { timerState } from "./timer"

const planState = atom({
  key: "planState",
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
      summary: "뭐냐뭐냐ffffffffffffffffffffffffffffffffffffffffffffffffff",
      description: "뭐냐뭐냐설명ddddddddddddddddddddddddddddddddddddddd",
      creator: {
        email: "didnlie@gmail.com",
        self: true,
      },
      organizer: {
        email: "didnlie@gmail.com",
        self: true,
      },
      start: {
        dateTime: "2022-10-27T17:30:00+09:00",
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: "2022-10-27T17:45:00+09:00",
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
        dateTime: "2022-10-27T15:50:00+09:00",
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: "2022-10-27T16:30:00+09:00",
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
      created: "2022-10-31T11:15:59.000Z",
      updated: "2022-10-31T11:30:59.971Z",
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
        dateTime: "2022-11-04T13:10:00+09:00",
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: "2022-11-04T13:30:00+09:00",
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

const upcomingPlanState = selector({
  key: "upcomingPlanState",
  get: ({ get }) => {
    const list = get(planState)
    const currentTime = get(timerState)

    return list.filter((item) => {
      const temp = new Date(item.start.dateTime) - currentTime
      return temp < 1000 * 60 * 20 && temp > 0 ? true : false
    })
  },
})

const upcomingPlanTimerState = selector({
  key: "upcomingPlanTimerState",
  get: ({ get }) => {
    const target = get(upcomingPlanState)
    if (target.length === 0) return false
    const currentTime = get(timerState)

    const temp = new Date(target[0].start.dateTime) - currentTime
    const hours = Math.floor(temp / (1000 * 60 * 60))
    const minutes = Math.floor((temp % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((temp % (1000 * 60)) / 1000)
    const impending = temp < 1000 * 60 * 10
    // return [
    //   hours.toString().padStart(2, "0"),
    //   minutes.toString().padStart(2, "0"),
    //   seconds.toString().padStart(2, "0"),
    // ]
    return [
      `${hours.toString().padStart(2, "0")} : ${minutes
        .toString()
        .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`,
      impending,
    ]
  },
})

const inProgressPlanState = selector({
  key: "inProgressPlanState",
  get: ({ get }) => {
    const list = get(planState)
    const currentTime = get(timerState)

    return list.filter((item) => {
      return currentTime - new Date(item.start.dateTime) >= 0 &&
        currentTime - new Date(item.end.dateTime) < 0
        ? true
        : false
    })
  },
})

export {
  planState,
  upcomingPlanState,
  inProgressPlanState,
  upcomingPlanTimerState,
}
