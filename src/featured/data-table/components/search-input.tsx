import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SearchInput() {
	const [searchParameter, setSearchParameter] = useQueryState('search');
	const [local, setLocal] = useState(searchParameter ?? '');

	function setSearchParams() {
		if (local) {
			setSearchParameter(local);
		} else {
			setSearchParameter(null);
		}
	}

	return (
		<div className="flex gap-2">
			<Input
				type="text"
				placeholder="Search..."
				className="w-56"
				value={local}
				onChange={(event) => setLocal(event.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && setSearchParams()}
			/>

			<Button onClick={setSearchParams} size="icon">
				<Search />
			</Button>
		</div>
	);
}
