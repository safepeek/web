import Link from "next/link"
import { Button } from "@/components/ui/button"
import DiscordIcon from "@/components/icons/DiscordIcon"
import TwitterXIcon from "@/components/icons/TwitterXIcon"
import GitHubIcon from "@/components/icons/GitHubIcon"

export const SocialIcons = () => {
  return (
    <div className="flex items-center gap-4">
      <Button size="icon" asChild>
        <Link
          className="text-white hover:text-gray-300"
          href="https://discord.gg/2TvARX4Xwp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordIcon fill="#fff" size={32} className="w-6 h-6" />
          <span className="sr-only">Discord</span>
        </Link>
      </Button>
      <Button size="icon" asChild>
        <Link
          className="text-white hover:text-gray-300"
          href="https://x.com/safepeekbot"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterXIcon fill="#fff" size={32} className="w-6 h-6" />
          <span className="sr-only">X</span>
        </Link>
      </Button>
      <Button size="icon" asChild>
        <Link
          className="text-white hover:text-gray-300"
          href="https://github.com/safepeek"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon fill="#fff" size={32} className="w-6 h-6"></GitHubIcon>
          <span className="sr-only">GitHub</span>
        </Link>
      </Button>
    </div>
  )
}

export const SocialIconsHeader = SocialIcons

export const SocialIconsFooter = () => {
  return (
    <div className="flex items-center gap-4">
      <Button className="bg-white fill-gray-500 hover:bg-white" size="icon" asChild>
        <Link href="https://discord.gg/2TvARX4Xwp" target="_blank" rel="noopener noreferrer">
          <DiscordIcon size={32} className="w-6 h-6" />
          <span className="sr-only">Discord</span>
        </Link>
      </Button>
      <Button className="bg-white fill-gray-500 hover:bg-white" size="icon" asChild>
        <Link href="https://x.com/safepeekbot" target="_blank" rel="noopener noreferrer">
          <TwitterXIcon size={32} className="w-6 h-6" />
          <span className="sr-only">X</span>
        </Link>
      </Button>
      <Button className="bg-white fill-gray-500 hover:bg-white" size="icon" asChild>
        <Link href="https://github.com/safepeek" target="_blank" rel="noopener noreferrer">
          <GitHubIcon size={32} className="w-6 h-6"></GitHubIcon>
          <span className="sr-only">GitHub</span>
        </Link>
      </Button>
    </div>
  )
}
