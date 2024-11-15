import * as Dialog from "@radix-ui/react-dialog";

interface InfoDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const InfoDialog = (props: InfoDialogProps) => {
	return (
		<Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="radix-dialog-overlay" />

				<Dialog.Content className="radix-dialog-content">
					<Dialog.Title className="radix-dialog-title">Info</Dialog.Title>
					<p>
					 	{/* 説明を書く */}
					</p>

					<div className="radix-dialog-actiongroup">
						<button
							type="button"
							className="radix-dialog-action-center"
							onClick={() => {
								props.onOpenChange(false);
							}}
						>
							OK
						</button>
					</div>

					<Dialog.Close asChild>
						<button type="button" className="radix-dialog-close-button">
							×
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default InfoDialog;
