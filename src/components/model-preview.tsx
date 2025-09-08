import { BookOpenText, CircleOff, Code, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import CodeComponent from "@/components/code";
import Link from "next/link";
import { brand } from "@/lib/branding";

export default function ModelPreview({ model }: { model: string }) {
  return (
    <div className="absolute bottom-2 right-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Code />
            Show {brand.name} Model
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{brand.name} Model</DialogTitle>
          </DialogHeader>
          <CodeComponent value={model} language="yaml" />
          <DialogFooter>
            <Link
              href={`${brand.docsUrl}/modeling/getting-started`}
              target="_blank"
              rel="noopener noreferrer">
              <Button>
                <BookOpenText />
                {brand.name} modeling documentation
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
