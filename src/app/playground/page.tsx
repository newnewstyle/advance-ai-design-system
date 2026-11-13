import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { NewComponentsDemo } from "@/components/new-components-demo"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Separator } from "@/components/ui/Separator"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>

        <div>
          <h2 className="font-medium">Dialog</h2>
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline" className="mt-2" />}
            >
              Open Dialog
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hello from Dialog</DialogTitle>
                <DialogDescription>
                  This is the shadcn dialog component. Click OK or Cancel, press
                  Esc, or click outside to close it.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancel
                </DialogClose>
                <DialogClose render={<Button />}>OK</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <h2 className="font-medium">Badge</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>

        <div>
          <h2 className="font-medium">Tooltip</h2>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="outline" className="mt-2" />}
            >
              Hover me
            </TooltipTrigger>
            <TooltipContent>Hello from Tooltip!</TooltipContent>
          </Tooltip>
        </div>

        <div>
          <h2 className="font-medium">Avatar</h2>
          <div className="mt-2 flex items-center gap-3">
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>NW</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div>
          <h2 className="font-medium">Card + Input + Label + Separator</h2>
          <Card className="mt-2">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your email and password.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground">
                The line above is a Separator.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign in</Button>
            </CardFooter>
          </Card>
        </div>

        <NewComponentsDemo />

        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
