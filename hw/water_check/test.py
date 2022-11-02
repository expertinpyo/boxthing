import water_yield_send
import asyncio
async def main():
    async for w in water_yield_send.amount_water():
        print(w)
        
        
asyncio.run(main())
