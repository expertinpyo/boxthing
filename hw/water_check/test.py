import water_check
import asyncio
async def main():
    async for w in water_check.amount_water():
        print(w)
        
        
asyncio.run(main())
