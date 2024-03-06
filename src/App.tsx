import { Button } from './components/ui/button';
import { useTheme } from './components/theme-provider';
import { Sun, Moon, Question, Plus, Images, Tag, PaperPlaneTilt, UsersThree, Warning } from '@phosphor-icons/react';
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';
import { useEffect, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';
import { ScrollArea } from './components/ui/scroll-area';
import { Input } from './components/ui/input';
import { Tooltip, TooltipTrigger } from '@radix-ui/react-tooltip';
import { TooltipContent } from './components/ui/tooltip';
import { Creator, Fan, creatorsStore } from './state/creator';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { faker } from '@faker-js/faker';

function App() {
  const { setTheme, theme } = useTheme();
  const [ selectedCreator, setSelectedCreator ] = useState<Creator>();
  const [ selectedFan, setSelectedFan ] = useState<Fan>();
  const { creators, setCreators } = creatorsStore();

  useEffect(() => {
    setCreators([
      {
        name: faker.person.fullName(),
        avatar: createAvatar(micah, {
          size: 64,
          seed: Math.random().toString(),
          }).toDataUriSync(),
        fans: [
          {
            name: faker.person.fullName(),
            avatar: createAvatar(micah, {
              size: 64,
              seed: Math.random().toString(),
            }).toDataUriSync(),
          },
          {
            name: faker.person.fullName(),
            avatar: createAvatar(micah, {
              size: 64,
              seed: Math.random().toString(),
            }).toDataUriSync(),
          },
        ],
      },
      {
        name: faker.person.fullName(),
        avatar: createAvatar(micah, {
          size: 64,
          seed: Math.random().toString(),
          }).toDataUriSync(),
        fans: [
          {
            name: faker.person.fullName(),
            avatar: createAvatar(micah, {
              size: 64,
              seed: Math.random().toString(),
            }).toDataUriSync(),
          },
          {
            name: faker.person.fullName(),
            avatar: createAvatar(micah, {
              size: 64,
              seed: Math.random().toString(),
            }).toDataUriSync(),
          },
          {
            name: faker.person.fullName(),
            avatar: createAvatar(micah, {
              size: 64,
              seed: Math.random().toString(),
            }).toDataUriSync(),
          },
        ],
      },
      {
        name: faker.person.fullName(),
        avatar: createAvatar(micah, {
          size: 64,
          seed: Math.random().toString(),
          }).toDataUriSync(),
        fans: [
          {
            name: faker.person.fullName(),
            avatar: createAvatar(micah, {
              size: 64,
              seed: Math.random().toString(),
            }).toDataUriSync(),
          },
          {
            name: faker.person.fullName(),
            avatar: createAvatar(micah, {
              size: 64,
              seed: Math.random().toString(),
            }).toDataUriSync(),
          },
        ],
      },
    ]);
  }, [setCreators]);
  return (
    <div className='flex flex-col h-svh max-h-svh'>
      <div className='flex flex-row min-h-10 justify-end align-center draggable'>
        {/* Title bar */}
          { theme ==='dark' 
            ? <Button variant='ghost' onClick={() => setTheme('light')}><Sun size={20} /></Button>
            : <Button variant='ghost' onClick={() => setTheme('dark')}><Moon size={20} /></Button> }
          <Button variant='ghost'><Question size={20} /></Button>
      </div>
      <div className='flex flex-row h-full max-h-full'>
        <div className='h-full flex flex-col justify-between px-2 align-center'>
          <div className='flex flex-col'>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant={selectedCreator ? 'ghost' : 'default'} className='h-8 w-8 md:h-14 md:w-14 p-0 my-1' onClick={() => setSelectedCreator(undefined)}>
                  <UsersThree size={30}/>
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right'>
                  All Creators
              </TooltipContent>
            </Tooltip>

            {creators.map(creator => (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant={creator === selectedCreator ? 'default' : 'ghost'} className='h-8 w-8 md:h-14 md:w-14 p-0 my-1' onClick={() => setSelectedCreator(creator)}>
                    <Avatar className='h-8 w-8 md:h-12 md:w-12'>
                      <AvatarImage src={creator.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right'>
                    {creator.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className='flex flex-col'>
            <Button variant='outline' className='h-8 w-8 md:h-14 md:w-14 p-0 my-1'>
              <Plus className='size-5 md:size-8'/>
            </Button>
          </div>
        </div>
        <div className='flex-1 h-full mr-2 flex bg-secondary border-2 rounded-xl'>
          <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel defaultSize={30} minSize={20} className='bg-gradient-to-r from-background to-secondary '>
              <ScrollArea className='h-full w-full rounded-md border p-4'>
                {( selectedCreator ? selectedCreator.fans : creators.flatMap(creator => creator.fans)).map(fan => (
                  <Button variant={fan === selectedFan ? 'default' : 'ghost'}  className='my-2 w-full justify-start' onClick={() => setSelectedFan(fan)}>
                    <Avatar className='mr-2'>
                      <AvatarImage src={fan.avatar} />
                      <AvatarFallback>{fan.name[0]}</AvatarFallback>
                    </Avatar>
                    {fan.name}
                  </Button>
                ))}
                    
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel minSize={60}>
              <div className='flex flex-col h-full'>
                <div className='h-full'>
                </div>
                <div className='flex flex-col m-4 bg-background border-2 rounded-md'>
                  <div className='flex flex-row pl-2'>
                    <Button variant='ghost' className='px-2'>
                      <Images size={20} />
                    </Button>
                    <Button variant='ghost' className='px-2'>
                      <Tag size={20} />
                    </Button>
                  </div>
                  <div className='flex flex-row'>
                    <Input className='border-0 rounded-none' placeholder={`Message ${selectedFan?.name ?? 'fan'}`} />
                    <Button variant='ghost' className='px-4'>
                      <PaperPlaneTilt size={20} />
                    </Button>
                  </div>

                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
      <div className=''>
        <div className='flex flex-row justify-between px-4 py-2'>
            <div />
            <div className='rounded-md p-0 text-muted-foreground flex flex-row text-center'>
              <Warning size={22} className='mr-2'/>
              Unkown state
            </div>
        </div>
      </div>
    </div>
  )
}

export default App
