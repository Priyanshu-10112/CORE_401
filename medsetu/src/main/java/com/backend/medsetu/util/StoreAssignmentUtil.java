package com.backend.medsetu.util;

import java.util.List;
import com.backend.medsetu.entity.Store;

public class StoreAssignmentUtil {

    private StoreAssignmentUtil() {
        // utility class – no object creation
    }

    public static Store assignStore(List<Store> stores) {

        if (stores == null || stores.isEmpty()) {
            return null;
        }

        // stores already sorted by priority (ASC) from repository
        return stores.get(0);
    }
}
