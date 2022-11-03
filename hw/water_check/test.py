import water_check
import asyncio
async def main():
    async for w in water_check():
        print(w)
        
        
asyncio.run(main())