const PublicLayout = ({ children }: { children: React.ReactNode }) => {

	return (
		<div className="flex flex-col w-screen h-screen ">
			{children}
		</div>
	)
}

export default PublicLayout;