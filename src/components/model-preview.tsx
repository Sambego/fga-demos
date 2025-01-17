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

export default function ModelPreview({ model }: { model: string }) {
  return (
    <div className="absolute bottom-2 right-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Code />
            Show OpenFGA Model
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OpenFGA Model</DialogTitle>
          </DialogHeader>
          <CodeComponent value={model} language="yaml" />
          <DialogFooter>
            <Link
              href="https://openfga.dev/docs/modeling/getting-started"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <BookOpenText />
                OpenFGA modeling documentation
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
