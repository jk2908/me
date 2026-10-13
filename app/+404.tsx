import type { HttpExceptionLike } from '@jk2908/solas/navigation'

export default function NotFound({ error }: { error: HttpExceptionLike }) {
	return (
		<div>
			<h1 className="heading">
				{error.status}—{error.message}
			</h1>

			<p>Nothingness</p>
		</div>
	)
}
