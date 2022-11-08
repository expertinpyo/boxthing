import posture_correction_test
from water_check import amount_water
import asyncio
async def posture_coro():
    async for p in posture_correction_test.check_pose():
        print(p)
        

async def water_coro():
    async for w in amount_water():
        print(w)
    
    
    
async def main():
    await asyncio.gather(
        posture_coro(),
        water_coro(),
    )
    
    
asyncio.run(main())

