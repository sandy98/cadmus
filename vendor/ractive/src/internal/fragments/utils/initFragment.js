initFragment = function ( fragment, options ) {

	var numItems, i, parentFragment, parentRefs, ref;

	// The item that owns this fragment - an element, section, partial, or attribute
	fragment.owner = options.owner;
	parentFragment = fragment.owner.parentFragment;

	// inherited properties
	fragment.root = options.root;
	fragment.parentNode = options.parentNode;
	fragment.contextStack = options.contextStack || [];

	// If parent item is a section, this may not be the only fragment
	// that belongs to it - we need to make a note of the index
	if ( fragment.owner.type === SECTION ) {
		fragment.index = options.index;
	}

	// index references (the 'i' in {{#section:i}}<!-- -->{{/section}}) need to cascade
	// down the tree
	if ( parentFragment ) {
		parentRefs = parentFragment.indexRefs;

		if ( parentRefs ) {
			fragment.indexRefs = createFromNull(); // avoids need for hasOwnProperty

			for ( ref in parentRefs ) {
				fragment.indexRefs[ ref ] = parentRefs[ ref ];
			}
		}
	}

	// inherit priority
	fragment.priority = ( parentFragment ? parentFragment.priority + 1 : 0 );

	if ( options.indexRef ) {
		if ( !fragment.indexRefs ) {
			fragment.indexRefs = {};
		}

		fragment.indexRefs[ options.indexRef ] = options.index;
	}

	// Time to create this fragment's child items;
	fragment.items = [];

	numItems = ( options.descriptor ? options.descriptor.length : 0 );
	for ( i=0; i<numItems; i+=1 ) {
		fragment.items[ fragment.items.length ] = fragment.createItem({
			parentFragment: fragment,
			descriptor: options.descriptor[i],
			index: i
		});
	}

};