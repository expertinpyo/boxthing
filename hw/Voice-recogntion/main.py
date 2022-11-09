import voice
import asyncio
async def multi_main():
    print("MAIN_HERE")
    while True :
        events = []
        events = voice.give_events()
        if events:
            print("QUEUE:",events)
        await asyncio.sleep(1)

asyncio.run(multi_main())
voice.th1.join()
voice.th2.join()
voice.th3.join()
