import posture_correction_test
import asyncio
async def main():
    async for w in posture_correction_test.check_pose():
        print(w)
        
        
asyncio.run(main())

