import { TagUsageType } from "@/lib/repositories/tags";
import { useState } from "react";

export const useTags = (initialTags: TagUsageType[]) => {
    const [registeredTags, setRegisteredTags] = useState<TagUsageType[]>(initialTags);
    const [unregisteredTags, setUnregisteredTags] = useState<TagUsageType[]>([]);
    return {
        registeredTags,
        setRegisteredTags,
        unregisteredTags,
        setUnregisteredTags
    }
}