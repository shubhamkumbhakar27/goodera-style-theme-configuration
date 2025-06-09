
import React, {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  RefAttributes,
  SetStateAction,
  useContext,
  useImperativeHandle,
  useState,
} from "react";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface CollapsibleProps {
  onOpen?: () => void;
  onClose?: () => void;
  children: ReactElement[];
}

export interface CollapsibleRefType {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface CollapsiblePropsWithRef
  extends React.ForwardRefExoticComponent<
    CollapsibleProps & RefAttributes<CollapsibleRefType>
  > {
  Head: typeof Head;
  Content: typeof Content;
  Toggle: typeof Toggle;
}

interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement | ReactElement[];
}

interface CollapsibleHeadProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement | ReactElement[];
}

interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement | ReactElement[];
}

interface ToggleProps extends HTMLAttributes<HTMLSpanElement> {
  openText?: string;
  closeText?: string;
  openIcon?: ReactElement;
  closeIcon?: ReactElement;
}

export const CollapsibleContext = createContext<{
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOpen?: () => void;
  onClose?: () => void;
}>({ isOpen: false, setOpen: () => {} });

const Toggle = ({
  openText,
  closeText,
  openIcon,
  closeIcon,
  ...props
}: ToggleProps) => {
  const { isOpen } = useContext(CollapsibleContext);

  return (
    <span className="flex items-center gap-1" {...props}>
      {isOpen ? (
        <>
          {closeText ? <span>{closeText}</span> : null}
          {closeIcon || (
            <ChevronUpIcon
              className="h-4 w-4"
              fill="#666666"
            />
          )}
        </>
      ) : (
        <>
          {openText ? <span>{openText}</span> : null}
          {openIcon || (
            <ChevronDownIcon
              className="h-4 w-4"
              fill="#666666"
            />
          )}
        </>
      )}
    </span>
  );
};

const Head = ({ children, ...props }: CollapsibleHeadProps) => {
  const { setOpen, onClose, onOpen } = useContext(CollapsibleContext);

  const handleToggle = () => {
    setOpen((_isOpen) => {
      _isOpen ? onClose?.() : onOpen?.();

      return !_isOpen;
    });
  };

  return (
    <button
      className="w-full outline-goodera-primary"
      {...props}
      onClick={handleToggle}
    >
      {children}
    </button>
  );
};

const Content = ({ children, ...props }: CollapsibleContentProps) => {
  const { isOpen } = useContext(CollapsibleContext);

  return (
    <div
      aria-expanded={isOpen}
      aria-hidden={!isOpen}
      className="grid w-full transition-grid-template-rows aria-hidden:grid-rows-0 aria-expanded:grid-rows-1"
      {...props}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};

const CollapsibleWithRef = forwardRef(function Collapsible(
  { onOpen, onClose, children }: CollapsibleProps,
  ref
) {
  const [isOpen, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setOpen(true);
    },
    close() {
      setOpen(false);
    },
    toggle() {
      setOpen((_isOpen) => !_isOpen);
    },
  }));

  return (
    <CollapsibleContext.Provider value={{ isOpen, setOpen, onOpen, onClose }}>
      {children}
    </CollapsibleContext.Provider>
  );
});

const Collapsible = CollapsibleWithRef as CollapsiblePropsWithRef;

Collapsible.Head = Head;
Collapsible.Content = Content;
Collapsible.Toggle = Toggle;

export { Collapsible };
