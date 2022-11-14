import posture_correction_test
import asyncio
async def posture_coro():
    async for p in posture_correction_test.check_pose():
        print(p)
        
async def main():
    await asyncio.gather(
        posture_coro(),
    )
    
    
asyncio.run(main())

