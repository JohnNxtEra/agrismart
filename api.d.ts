import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { BulkUpdateResult, CommunityPost, CommunityPostInput, Crop, CropInput, CropUpdate, DashboardSummary, DiaryEntry, DiaryEntryInput, DiseaseDetection, DiseaseDetectionInput, ErrorResponse, Expense, ExpenseInput, ExpenseSummary, GeminiConversation, GeminiConversationInput, GeminiConversationWithMessages, GeminiError, GeminiImageInput, GeminiImageOutput, GeminiMessage, GeminiMessageInput, GovernmentScheme, GovernmentSchemeInput, GovernmentSchemeUpdate, HealthStatus, IrrigationSchedule, IrrigationScheduleInput, IrrigationScheduleUpdate, LandListing, LandListingInput, LandListingUpdate, MarketPrice, MarketPriceInput, MarketSummary, Notification, SoilAnalysis, SoilAnalysisInput } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetDashboardUrl: () => string;
/**
 * @summary Get dashboard summary
 */
export declare const getDashboard: (options?: RequestInit) => Promise<DashboardSummary>;
export declare const getGetDashboardQueryKey: () => readonly ["/api/dashboard"];
export declare const getGetDashboardQueryOptions: <TData = Awaited<ReturnType<typeof getDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboard>>>;
export type GetDashboardQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard summary
 */
export declare function useGetDashboard<TData = Awaited<ReturnType<typeof getDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListCropsUrl: () => string;
/**
 * @summary List all crops for the farm
 */
export declare const listCrops: (options?: RequestInit) => Promise<Crop[]>;
export declare const getListCropsQueryKey: () => readonly ["/api/crops"];
export declare const getListCropsQueryOptions: <TData = Awaited<ReturnType<typeof listCrops>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCrops>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCrops>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCropsQueryResult = NonNullable<Awaited<ReturnType<typeof listCrops>>>;
export type ListCropsQueryError = ErrorType<unknown>;
/**
 * @summary List all crops for the farm
 */
export declare function useListCrops<TData = Awaited<ReturnType<typeof listCrops>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCrops>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateCropUrl: () => string;
/**
 * @summary Add a new crop
 */
export declare const createCrop: (cropInput: CropInput, options?: RequestInit) => Promise<Crop>;
export declare const getCreateCropMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCrop>>, TError, {
        data: BodyType<CropInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCrop>>, TError, {
    data: BodyType<CropInput>;
}, TContext>;
export type CreateCropMutationResult = NonNullable<Awaited<ReturnType<typeof createCrop>>>;
export type CreateCropMutationBody = BodyType<CropInput>;
export type CreateCropMutationError = ErrorType<unknown>;
/**
* @summary Add a new crop
*/
export declare const useCreateCrop: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCrop>>, TError, {
        data: BodyType<CropInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCrop>>, TError, {
    data: BodyType<CropInput>;
}, TContext>;
export declare const getGetCropUrl: (id: number) => string;
/**
 * @summary Get crop by ID
 */
export declare const getCrop: (id: number, options?: RequestInit) => Promise<Crop>;
export declare const getGetCropQueryKey: (id: number) => readonly [`/api/crops/${number}`];
export declare const getGetCropQueryOptions: <TData = Awaited<ReturnType<typeof getCrop>>, TError = ErrorType<ErrorResponse>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCrop>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCrop>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCropQueryResult = NonNullable<Awaited<ReturnType<typeof getCrop>>>;
export type GetCropQueryError = ErrorType<ErrorResponse>;
/**
 * @summary Get crop by ID
 */
export declare function useGetCrop<TData = Awaited<ReturnType<typeof getCrop>>, TError = ErrorType<ErrorResponse>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCrop>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateCropUrl: (id: number) => string;
/**
 * @summary Update a crop
 */
export declare const updateCrop: (id: number, cropUpdate: CropUpdate, options?: RequestInit) => Promise<Crop>;
export declare const getUpdateCropMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCrop>>, TError, {
        id: number;
        data: BodyType<CropUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateCrop>>, TError, {
    id: number;
    data: BodyType<CropUpdate>;
}, TContext>;
export type UpdateCropMutationResult = NonNullable<Awaited<ReturnType<typeof updateCrop>>>;
export type UpdateCropMutationBody = BodyType<CropUpdate>;
export type UpdateCropMutationError = ErrorType<unknown>;
/**
* @summary Update a crop
*/
export declare const useUpdateCrop: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCrop>>, TError, {
        id: number;
        data: BodyType<CropUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateCrop>>, TError, {
    id: number;
    data: BodyType<CropUpdate>;
}, TContext>;
export declare const getDeleteCropUrl: (id: number) => string;
/**
 * @summary Delete a crop
 */
export declare const deleteCrop: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteCropMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCrop>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteCrop>>, TError, {
    id: number;
}, TContext>;
export type DeleteCropMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCrop>>>;
export type DeleteCropMutationError = ErrorType<unknown>;
/**
* @summary Delete a crop
*/
export declare const useDeleteCrop: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCrop>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteCrop>>, TError, {
    id: number;
}, TContext>;
export declare const getListDiseaseDetectionsUrl: () => string;
/**
 * @summary List disease detection history
 */
export declare const listDiseaseDetections: (options?: RequestInit) => Promise<DiseaseDetection[]>;
export declare const getListDiseaseDetectionsQueryKey: () => readonly ["/api/disease/detections"];
export declare const getListDiseaseDetectionsQueryOptions: <TData = Awaited<ReturnType<typeof listDiseaseDetections>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listDiseaseDetections>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listDiseaseDetections>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListDiseaseDetectionsQueryResult = NonNullable<Awaited<ReturnType<typeof listDiseaseDetections>>>;
export type ListDiseaseDetectionsQueryError = ErrorType<unknown>;
/**
 * @summary List disease detection history
 */
export declare function useListDiseaseDetections<TData = Awaited<ReturnType<typeof listDiseaseDetections>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listDiseaseDetections>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateDiseaseDetectionUrl: () => string;
/**
 * @summary Analyze crop image for disease using Gemini Vision
 */
export declare const createDiseaseDetection: (diseaseDetectionInput: DiseaseDetectionInput, options?: RequestInit) => Promise<DiseaseDetection>;
export declare const getCreateDiseaseDetectionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createDiseaseDetection>>, TError, {
        data: BodyType<DiseaseDetectionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createDiseaseDetection>>, TError, {
    data: BodyType<DiseaseDetectionInput>;
}, TContext>;
export type CreateDiseaseDetectionMutationResult = NonNullable<Awaited<ReturnType<typeof createDiseaseDetection>>>;
export type CreateDiseaseDetectionMutationBody = BodyType<DiseaseDetectionInput>;
export type CreateDiseaseDetectionMutationError = ErrorType<unknown>;
/**
* @summary Analyze crop image for disease using Gemini Vision
*/
export declare const useCreateDiseaseDetection: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createDiseaseDetection>>, TError, {
        data: BodyType<DiseaseDetectionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createDiseaseDetection>>, TError, {
    data: BodyType<DiseaseDetectionInput>;
}, TContext>;
export declare const getGetDiseaseDetectionUrl: (id: number) => string;
/**
 * @summary Get detection result
 */
export declare const getDiseaseDetection: (id: number, options?: RequestInit) => Promise<DiseaseDetection>;
export declare const getGetDiseaseDetectionQueryKey: (id: number) => readonly [`/api/disease/detections/${number}`];
export declare const getGetDiseaseDetectionQueryOptions: <TData = Awaited<ReturnType<typeof getDiseaseDetection>>, TError = ErrorType<ErrorResponse>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDiseaseDetection>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDiseaseDetection>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDiseaseDetectionQueryResult = NonNullable<Awaited<ReturnType<typeof getDiseaseDetection>>>;
export type GetDiseaseDetectionQueryError = ErrorType<ErrorResponse>;
/**
 * @summary Get detection result
 */
export declare function useGetDiseaseDetection<TData = Awaited<ReturnType<typeof getDiseaseDetection>>, TError = ErrorType<ErrorResponse>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDiseaseDetection>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListMarketPricesUrl: () => string;
/**
 * @summary List MSP and market prices
 */
export declare const listMarketPrices: (options?: RequestInit) => Promise<MarketPrice[]>;
export declare const getListMarketPricesQueryKey: () => readonly ["/api/market/prices"];
export declare const getListMarketPricesQueryOptions: <TData = Awaited<ReturnType<typeof listMarketPrices>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMarketPrices>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMarketPrices>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMarketPricesQueryResult = NonNullable<Awaited<ReturnType<typeof listMarketPrices>>>;
export type ListMarketPricesQueryError = ErrorType<unknown>;
/**
 * @summary List MSP and market prices
 */
export declare function useListMarketPrices<TData = Awaited<ReturnType<typeof listMarketPrices>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMarketPrices>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateMarketPriceUrl: () => string;
/**
 * @summary Add a market price entry
 */
export declare const createMarketPrice: (marketPriceInput: MarketPriceInput, options?: RequestInit) => Promise<MarketPrice>;
export declare const getCreateMarketPriceMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMarketPrice>>, TError, {
        data: BodyType<MarketPriceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createMarketPrice>>, TError, {
    data: BodyType<MarketPriceInput>;
}, TContext>;
export type CreateMarketPriceMutationResult = NonNullable<Awaited<ReturnType<typeof createMarketPrice>>>;
export type CreateMarketPriceMutationBody = BodyType<MarketPriceInput>;
export type CreateMarketPriceMutationError = ErrorType<unknown>;
/**
* @summary Add a market price entry
*/
export declare const useCreateMarketPrice: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMarketPrice>>, TError, {
        data: BodyType<MarketPriceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createMarketPrice>>, TError, {
    data: BodyType<MarketPriceInput>;
}, TContext>;
export declare const getGetMarketSummaryUrl: () => string;
/**
 * @summary Get market summary with top movers and recommendations
 */
export declare const getMarketSummary: (options?: RequestInit) => Promise<MarketSummary>;
export declare const getGetMarketSummaryQueryKey: () => readonly ["/api/market/summary"];
export declare const getGetMarketSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getMarketSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMarketSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMarketSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMarketSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getMarketSummary>>>;
export type GetMarketSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get market summary with top movers and recommendations
 */
export declare function useGetMarketSummary<TData = Awaited<ReturnType<typeof getMarketSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMarketSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListIrrigationSchedulesUrl: () => string;
/**
 * @summary List irrigation schedules
 */
export declare const listIrrigationSchedules: (options?: RequestInit) => Promise<IrrigationSchedule[]>;
export declare const getListIrrigationSchedulesQueryKey: () => readonly ["/api/irrigation/schedules"];
export declare const getListIrrigationSchedulesQueryOptions: <TData = Awaited<ReturnType<typeof listIrrigationSchedules>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listIrrigationSchedules>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listIrrigationSchedules>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListIrrigationSchedulesQueryResult = NonNullable<Awaited<ReturnType<typeof listIrrigationSchedules>>>;
export type ListIrrigationSchedulesQueryError = ErrorType<unknown>;
/**
 * @summary List irrigation schedules
 */
export declare function useListIrrigationSchedules<TData = Awaited<ReturnType<typeof listIrrigationSchedules>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listIrrigationSchedules>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateIrrigationScheduleUrl: () => string;
/**
 * @summary Create irrigation schedule
 */
export declare const createIrrigationSchedule: (irrigationScheduleInput: IrrigationScheduleInput, options?: RequestInit) => Promise<IrrigationSchedule>;
export declare const getCreateIrrigationScheduleMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createIrrigationSchedule>>, TError, {
        data: BodyType<IrrigationScheduleInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createIrrigationSchedule>>, TError, {
    data: BodyType<IrrigationScheduleInput>;
}, TContext>;
export type CreateIrrigationScheduleMutationResult = NonNullable<Awaited<ReturnType<typeof createIrrigationSchedule>>>;
export type CreateIrrigationScheduleMutationBody = BodyType<IrrigationScheduleInput>;
export type CreateIrrigationScheduleMutationError = ErrorType<unknown>;
/**
* @summary Create irrigation schedule
*/
export declare const useCreateIrrigationSchedule: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createIrrigationSchedule>>, TError, {
        data: BodyType<IrrigationScheduleInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createIrrigationSchedule>>, TError, {
    data: BodyType<IrrigationScheduleInput>;
}, TContext>;
export declare const getUpdateIrrigationScheduleUrl: (id: number) => string;
/**
 * @summary Update irrigation schedule
 */
export declare const updateIrrigationSchedule: (id: number, irrigationScheduleUpdate: IrrigationScheduleUpdate, options?: RequestInit) => Promise<IrrigationSchedule>;
export declare const getUpdateIrrigationScheduleMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateIrrigationSchedule>>, TError, {
        id: number;
        data: BodyType<IrrigationScheduleUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateIrrigationSchedule>>, TError, {
    id: number;
    data: BodyType<IrrigationScheduleUpdate>;
}, TContext>;
export type UpdateIrrigationScheduleMutationResult = NonNullable<Awaited<ReturnType<typeof updateIrrigationSchedule>>>;
export type UpdateIrrigationScheduleMutationBody = BodyType<IrrigationScheduleUpdate>;
export type UpdateIrrigationScheduleMutationError = ErrorType<unknown>;
/**
* @summary Update irrigation schedule
*/
export declare const useUpdateIrrigationSchedule: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateIrrigationSchedule>>, TError, {
        id: number;
        data: BodyType<IrrigationScheduleUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateIrrigationSchedule>>, TError, {
    id: number;
    data: BodyType<IrrigationScheduleUpdate>;
}, TContext>;
export declare const getDeleteIrrigationScheduleUrl: (id: number) => string;
/**
 * @summary Delete irrigation schedule
 */
export declare const deleteIrrigationSchedule: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteIrrigationScheduleMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteIrrigationSchedule>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteIrrigationSchedule>>, TError, {
    id: number;
}, TContext>;
export type DeleteIrrigationScheduleMutationResult = NonNullable<Awaited<ReturnType<typeof deleteIrrigationSchedule>>>;
export type DeleteIrrigationScheduleMutationError = ErrorType<unknown>;
/**
* @summary Delete irrigation schedule
*/
export declare const useDeleteIrrigationSchedule: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteIrrigationSchedule>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteIrrigationSchedule>>, TError, {
    id: number;
}, TContext>;
export declare const getListDiaryEntriesUrl: () => string;
/**
 * @summary List farm diary entries
 */
export declare const listDiaryEntries: (options?: RequestInit) => Promise<DiaryEntry[]>;
export declare const getListDiaryEntriesQueryKey: () => readonly ["/api/diary/entries"];
export declare const getListDiaryEntriesQueryOptions: <TData = Awaited<ReturnType<typeof listDiaryEntries>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listDiaryEntries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listDiaryEntries>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListDiaryEntriesQueryResult = NonNullable<Awaited<ReturnType<typeof listDiaryEntries>>>;
export type ListDiaryEntriesQueryError = ErrorType<unknown>;
/**
 * @summary List farm diary entries
 */
export declare function useListDiaryEntries<TData = Awaited<ReturnType<typeof listDiaryEntries>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listDiaryEntries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateDiaryEntryUrl: () => string;
/**
 * @summary Create a diary entry
 */
export declare const createDiaryEntry: (diaryEntryInput: DiaryEntryInput, options?: RequestInit) => Promise<DiaryEntry>;
export declare const getCreateDiaryEntryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createDiaryEntry>>, TError, {
        data: BodyType<DiaryEntryInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createDiaryEntry>>, TError, {
    data: BodyType<DiaryEntryInput>;
}, TContext>;
export type CreateDiaryEntryMutationResult = NonNullable<Awaited<ReturnType<typeof createDiaryEntry>>>;
export type CreateDiaryEntryMutationBody = BodyType<DiaryEntryInput>;
export type CreateDiaryEntryMutationError = ErrorType<unknown>;
/**
* @summary Create a diary entry
*/
export declare const useCreateDiaryEntry: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createDiaryEntry>>, TError, {
        data: BodyType<DiaryEntryInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createDiaryEntry>>, TError, {
    data: BodyType<DiaryEntryInput>;
}, TContext>;
export declare const getGetDiaryEntryUrl: (id: number) => string;
/**
 * @summary Get diary entry
 */
export declare const getDiaryEntry: (id: number, options?: RequestInit) => Promise<DiaryEntry>;
export declare const getGetDiaryEntryQueryKey: (id: number) => readonly [`/api/diary/entries/${number}`];
export declare const getGetDiaryEntryQueryOptions: <TData = Awaited<ReturnType<typeof getDiaryEntry>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDiaryEntry>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDiaryEntry>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDiaryEntryQueryResult = NonNullable<Awaited<ReturnType<typeof getDiaryEntry>>>;
export type GetDiaryEntryQueryError = ErrorType<unknown>;
/**
 * @summary Get diary entry
 */
export declare function useGetDiaryEntry<TData = Awaited<ReturnType<typeof getDiaryEntry>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDiaryEntry>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getDeleteDiaryEntryUrl: (id: number) => string;
/**
 * @summary Delete diary entry
 */
export declare const deleteDiaryEntry: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteDiaryEntryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteDiaryEntry>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteDiaryEntry>>, TError, {
    id: number;
}, TContext>;
export type DeleteDiaryEntryMutationResult = NonNullable<Awaited<ReturnType<typeof deleteDiaryEntry>>>;
export type DeleteDiaryEntryMutationError = ErrorType<unknown>;
/**
* @summary Delete diary entry
*/
export declare const useDeleteDiaryEntry: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteDiaryEntry>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteDiaryEntry>>, TError, {
    id: number;
}, TContext>;
export declare const getListSchemesUrl: () => string;
/**
 * @summary List government schemes
 */
export declare const listSchemes: (options?: RequestInit) => Promise<GovernmentScheme[]>;
export declare const getListSchemesQueryKey: () => readonly ["/api/schemes"];
export declare const getListSchemesQueryOptions: <TData = Awaited<ReturnType<typeof listSchemes>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSchemes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listSchemes>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListSchemesQueryResult = NonNullable<Awaited<ReturnType<typeof listSchemes>>>;
export type ListSchemesQueryError = ErrorType<unknown>;
/**
 * @summary List government schemes
 */
export declare function useListSchemes<TData = Awaited<ReturnType<typeof listSchemes>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSchemes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateSchemeUrl: () => string;
/**
 * @summary Add a government scheme
 */
export declare const createScheme: (governmentSchemeInput: GovernmentSchemeInput, options?: RequestInit) => Promise<GovernmentScheme>;
export declare const getCreateSchemeMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createScheme>>, TError, {
        data: BodyType<GovernmentSchemeInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createScheme>>, TError, {
    data: BodyType<GovernmentSchemeInput>;
}, TContext>;
export type CreateSchemeMutationResult = NonNullable<Awaited<ReturnType<typeof createScheme>>>;
export type CreateSchemeMutationBody = BodyType<GovernmentSchemeInput>;
export type CreateSchemeMutationError = ErrorType<unknown>;
/**
* @summary Add a government scheme
*/
export declare const useCreateScheme: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createScheme>>, TError, {
        data: BodyType<GovernmentSchemeInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createScheme>>, TError, {
    data: BodyType<GovernmentSchemeInput>;
}, TContext>;
export declare const getGetSchemeUrl: (id: number) => string;
/**
 * @summary Get scheme details
 */
export declare const getScheme: (id: number, options?: RequestInit) => Promise<GovernmentScheme>;
export declare const getGetSchemeQueryKey: (id: number) => readonly [`/api/schemes/${number}`];
export declare const getGetSchemeQueryOptions: <TData = Awaited<ReturnType<typeof getScheme>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getScheme>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getScheme>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSchemeQueryResult = NonNullable<Awaited<ReturnType<typeof getScheme>>>;
export type GetSchemeQueryError = ErrorType<unknown>;
/**
 * @summary Get scheme details
 */
export declare function useGetScheme<TData = Awaited<ReturnType<typeof getScheme>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getScheme>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateSchemeUrl: (id: number) => string;
/**
 * @summary Update scheme
 */
export declare const updateScheme: (id: number, governmentSchemeUpdate: GovernmentSchemeUpdate, options?: RequestInit) => Promise<GovernmentScheme>;
export declare const getUpdateSchemeMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateScheme>>, TError, {
        id: number;
        data: BodyType<GovernmentSchemeUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateScheme>>, TError, {
    id: number;
    data: BodyType<GovernmentSchemeUpdate>;
}, TContext>;
export type UpdateSchemeMutationResult = NonNullable<Awaited<ReturnType<typeof updateScheme>>>;
export type UpdateSchemeMutationBody = BodyType<GovernmentSchemeUpdate>;
export type UpdateSchemeMutationError = ErrorType<unknown>;
/**
* @summary Update scheme
*/
export declare const useUpdateScheme: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateScheme>>, TError, {
        id: number;
        data: BodyType<GovernmentSchemeUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateScheme>>, TError, {
    id: number;
    data: BodyType<GovernmentSchemeUpdate>;
}, TContext>;
export declare const getDeleteSchemeUrl: (id: number) => string;
/**
 * @summary Delete scheme
 */
export declare const deleteScheme: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteSchemeMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteScheme>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteScheme>>, TError, {
    id: number;
}, TContext>;
export type DeleteSchemeMutationResult = NonNullable<Awaited<ReturnType<typeof deleteScheme>>>;
export type DeleteSchemeMutationError = ErrorType<unknown>;
/**
* @summary Delete scheme
*/
export declare const useDeleteScheme: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteScheme>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteScheme>>, TError, {
    id: number;
}, TContext>;
export declare const getListLandListingsUrl: () => string;
/**
 * @summary List land marketplace listings
 */
export declare const listLandListings: (options?: RequestInit) => Promise<LandListing[]>;
export declare const getListLandListingsQueryKey: () => readonly ["/api/land/listings"];
export declare const getListLandListingsQueryOptions: <TData = Awaited<ReturnType<typeof listLandListings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLandListings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listLandListings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListLandListingsQueryResult = NonNullable<Awaited<ReturnType<typeof listLandListings>>>;
export type ListLandListingsQueryError = ErrorType<unknown>;
/**
 * @summary List land marketplace listings
 */
export declare function useListLandListings<TData = Awaited<ReturnType<typeof listLandListings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLandListings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateLandListingUrl: () => string;
/**
 * @summary Create a land listing
 */
export declare const createLandListing: (landListingInput: LandListingInput, options?: RequestInit) => Promise<LandListing>;
export declare const getCreateLandListingMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLandListing>>, TError, {
        data: BodyType<LandListingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createLandListing>>, TError, {
    data: BodyType<LandListingInput>;
}, TContext>;
export type CreateLandListingMutationResult = NonNullable<Awaited<ReturnType<typeof createLandListing>>>;
export type CreateLandListingMutationBody = BodyType<LandListingInput>;
export type CreateLandListingMutationError = ErrorType<unknown>;
/**
* @summary Create a land listing
*/
export declare const useCreateLandListing: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLandListing>>, TError, {
        data: BodyType<LandListingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createLandListing>>, TError, {
    data: BodyType<LandListingInput>;
}, TContext>;
export declare const getGetLandListingUrl: (id: number) => string;
/**
 * @summary Get land listing
 */
export declare const getLandListing: (id: number, options?: RequestInit) => Promise<LandListing>;
export declare const getGetLandListingQueryKey: (id: number) => readonly [`/api/land/listings/${number}`];
export declare const getGetLandListingQueryOptions: <TData = Awaited<ReturnType<typeof getLandListing>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLandListing>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getLandListing>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetLandListingQueryResult = NonNullable<Awaited<ReturnType<typeof getLandListing>>>;
export type GetLandListingQueryError = ErrorType<unknown>;
/**
 * @summary Get land listing
 */
export declare function useGetLandListing<TData = Awaited<ReturnType<typeof getLandListing>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLandListing>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateLandListingUrl: (id: number) => string;
/**
 * @summary Update land listing
 */
export declare const updateLandListing: (id: number, landListingUpdate: LandListingUpdate, options?: RequestInit) => Promise<LandListing>;
export declare const getUpdateLandListingMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLandListing>>, TError, {
        id: number;
        data: BodyType<LandListingUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateLandListing>>, TError, {
    id: number;
    data: BodyType<LandListingUpdate>;
}, TContext>;
export type UpdateLandListingMutationResult = NonNullable<Awaited<ReturnType<typeof updateLandListing>>>;
export type UpdateLandListingMutationBody = BodyType<LandListingUpdate>;
export type UpdateLandListingMutationError = ErrorType<unknown>;
/**
* @summary Update land listing
*/
export declare const useUpdateLandListing: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLandListing>>, TError, {
        id: number;
        data: BodyType<LandListingUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateLandListing>>, TError, {
    id: number;
    data: BodyType<LandListingUpdate>;
}, TContext>;
export declare const getDeleteLandListingUrl: (id: number) => string;
/**
 * @summary Delete land listing
 */
export declare const deleteLandListing: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteLandListingMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteLandListing>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteLandListing>>, TError, {
    id: number;
}, TContext>;
export type DeleteLandListingMutationResult = NonNullable<Awaited<ReturnType<typeof deleteLandListing>>>;
export type DeleteLandListingMutationError = ErrorType<unknown>;
/**
* @summary Delete land listing
*/
export declare const useDeleteLandListing: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteLandListing>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteLandListing>>, TError, {
    id: number;
}, TContext>;
export declare const getListCommunityPostsUrl: () => string;
/**
 * @summary List community posts
 */
export declare const listCommunityPosts: (options?: RequestInit) => Promise<CommunityPost[]>;
export declare const getListCommunityPostsQueryKey: () => readonly ["/api/community/posts"];
export declare const getListCommunityPostsQueryOptions: <TData = Awaited<ReturnType<typeof listCommunityPosts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCommunityPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCommunityPosts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCommunityPostsQueryResult = NonNullable<Awaited<ReturnType<typeof listCommunityPosts>>>;
export type ListCommunityPostsQueryError = ErrorType<unknown>;
/**
 * @summary List community posts
 */
export declare function useListCommunityPosts<TData = Awaited<ReturnType<typeof listCommunityPosts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCommunityPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateCommunityPostUrl: () => string;
/**
 * @summary Create community post
 */
export declare const createCommunityPost: (communityPostInput: CommunityPostInput, options?: RequestInit) => Promise<CommunityPost>;
export declare const getCreateCommunityPostMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCommunityPost>>, TError, {
        data: BodyType<CommunityPostInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCommunityPost>>, TError, {
    data: BodyType<CommunityPostInput>;
}, TContext>;
export type CreateCommunityPostMutationResult = NonNullable<Awaited<ReturnType<typeof createCommunityPost>>>;
export type CreateCommunityPostMutationBody = BodyType<CommunityPostInput>;
export type CreateCommunityPostMutationError = ErrorType<unknown>;
/**
* @summary Create community post
*/
export declare const useCreateCommunityPost: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCommunityPost>>, TError, {
        data: BodyType<CommunityPostInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCommunityPost>>, TError, {
    data: BodyType<CommunityPostInput>;
}, TContext>;
export declare const getGetCommunityPostUrl: (id: number) => string;
/**
 * @summary Get community post
 */
export declare const getCommunityPost: (id: number, options?: RequestInit) => Promise<CommunityPost>;
export declare const getGetCommunityPostQueryKey: (id: number) => readonly [`/api/community/posts/${number}`];
export declare const getGetCommunityPostQueryOptions: <TData = Awaited<ReturnType<typeof getCommunityPost>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCommunityPost>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCommunityPost>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCommunityPostQueryResult = NonNullable<Awaited<ReturnType<typeof getCommunityPost>>>;
export type GetCommunityPostQueryError = ErrorType<unknown>;
/**
 * @summary Get community post
 */
export declare function useGetCommunityPost<TData = Awaited<ReturnType<typeof getCommunityPost>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCommunityPost>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getDeleteCommunityPostUrl: (id: number) => string;
/**
 * @summary Delete community post
 */
export declare const deleteCommunityPost: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteCommunityPostMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCommunityPost>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteCommunityPost>>, TError, {
    id: number;
}, TContext>;
export type DeleteCommunityPostMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCommunityPost>>>;
export type DeleteCommunityPostMutationError = ErrorType<unknown>;
/**
* @summary Delete community post
*/
export declare const useDeleteCommunityPost: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCommunityPost>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteCommunityPost>>, TError, {
    id: number;
}, TContext>;
export declare const getLikeCommunityPostUrl: (id: number) => string;
/**
 * @summary Like a community post
 */
export declare const likeCommunityPost: (id: number, options?: RequestInit) => Promise<CommunityPost>;
export declare const getLikeCommunityPostMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof likeCommunityPost>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof likeCommunityPost>>, TError, {
    id: number;
}, TContext>;
export type LikeCommunityPostMutationResult = NonNullable<Awaited<ReturnType<typeof likeCommunityPost>>>;
export type LikeCommunityPostMutationError = ErrorType<unknown>;
/**
* @summary Like a community post
*/
export declare const useLikeCommunityPost: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof likeCommunityPost>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof likeCommunityPost>>, TError, {
    id: number;
}, TContext>;
export declare const getListExpensesUrl: () => string;
/**
 * @summary List expenses
 */
export declare const listExpenses: (options?: RequestInit) => Promise<Expense[]>;
export declare const getListExpensesQueryKey: () => readonly ["/api/expenses"];
export declare const getListExpensesQueryOptions: <TData = Awaited<ReturnType<typeof listExpenses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listExpenses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listExpenses>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListExpensesQueryResult = NonNullable<Awaited<ReturnType<typeof listExpenses>>>;
export type ListExpensesQueryError = ErrorType<unknown>;
/**
 * @summary List expenses
 */
export declare function useListExpenses<TData = Awaited<ReturnType<typeof listExpenses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listExpenses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateExpenseUrl: () => string;
/**
 * @summary Add an expense
 */
export declare const createExpense: (expenseInput: ExpenseInput, options?: RequestInit) => Promise<Expense>;
export declare const getCreateExpenseMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createExpense>>, TError, {
        data: BodyType<ExpenseInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createExpense>>, TError, {
    data: BodyType<ExpenseInput>;
}, TContext>;
export type CreateExpenseMutationResult = NonNullable<Awaited<ReturnType<typeof createExpense>>>;
export type CreateExpenseMutationBody = BodyType<ExpenseInput>;
export type CreateExpenseMutationError = ErrorType<unknown>;
/**
* @summary Add an expense
*/
export declare const useCreateExpense: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createExpense>>, TError, {
        data: BodyType<ExpenseInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createExpense>>, TError, {
    data: BodyType<ExpenseInput>;
}, TContext>;
export declare const getDeleteExpenseUrl: (id: number) => string;
/**
 * @summary Delete an expense
 */
export declare const deleteExpense: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteExpenseMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteExpense>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteExpense>>, TError, {
    id: number;
}, TContext>;
export type DeleteExpenseMutationResult = NonNullable<Awaited<ReturnType<typeof deleteExpense>>>;
export type DeleteExpenseMutationError = ErrorType<unknown>;
/**
* @summary Delete an expense
*/
export declare const useDeleteExpense: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteExpense>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteExpense>>, TError, {
    id: number;
}, TContext>;
export declare const getGetExpenseSummaryUrl: () => string;
/**
 * @summary Get expense summary by category
 */
export declare const getExpenseSummary: (options?: RequestInit) => Promise<ExpenseSummary>;
export declare const getGetExpenseSummaryQueryKey: () => readonly ["/api/expenses/summary"];
export declare const getGetExpenseSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getExpenseSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getExpenseSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getExpenseSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetExpenseSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getExpenseSummary>>>;
export type GetExpenseSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get expense summary by category
 */
export declare function useGetExpenseSummary<TData = Awaited<ReturnType<typeof getExpenseSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getExpenseSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListSoilAnalysesUrl: () => string;
/**
 * @summary List soil analyses
 */
export declare const listSoilAnalyses: (options?: RequestInit) => Promise<SoilAnalysis[]>;
export declare const getListSoilAnalysesQueryKey: () => readonly ["/api/soil/analyses"];
export declare const getListSoilAnalysesQueryOptions: <TData = Awaited<ReturnType<typeof listSoilAnalyses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSoilAnalyses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listSoilAnalyses>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListSoilAnalysesQueryResult = NonNullable<Awaited<ReturnType<typeof listSoilAnalyses>>>;
export type ListSoilAnalysesQueryError = ErrorType<unknown>;
/**
 * @summary List soil analyses
 */
export declare function useListSoilAnalyses<TData = Awaited<ReturnType<typeof listSoilAnalyses>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSoilAnalyses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateSoilAnalysisUrl: () => string;
/**
 * @summary Submit soil analysis and get AI recommendations
 */
export declare const createSoilAnalysis: (soilAnalysisInput: SoilAnalysisInput, options?: RequestInit) => Promise<SoilAnalysis>;
export declare const getCreateSoilAnalysisMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createSoilAnalysis>>, TError, {
        data: BodyType<SoilAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createSoilAnalysis>>, TError, {
    data: BodyType<SoilAnalysisInput>;
}, TContext>;
export type CreateSoilAnalysisMutationResult = NonNullable<Awaited<ReturnType<typeof createSoilAnalysis>>>;
export type CreateSoilAnalysisMutationBody = BodyType<SoilAnalysisInput>;
export type CreateSoilAnalysisMutationError = ErrorType<unknown>;
/**
* @summary Submit soil analysis and get AI recommendations
*/
export declare const useCreateSoilAnalysis: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createSoilAnalysis>>, TError, {
        data: BodyType<SoilAnalysisInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createSoilAnalysis>>, TError, {
    data: BodyType<SoilAnalysisInput>;
}, TContext>;
export declare const getListNotificationsUrl: () => string;
/**
 * @summary List notifications
 */
export declare const listNotifications: (options?: RequestInit) => Promise<Notification[]>;
export declare const getListNotificationsQueryKey: () => readonly ["/api/notifications"];
export declare const getListNotificationsQueryOptions: <TData = Awaited<ReturnType<typeof listNotifications>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListNotificationsQueryResult = NonNullable<Awaited<ReturnType<typeof listNotifications>>>;
export type ListNotificationsQueryError = ErrorType<unknown>;
/**
 * @summary List notifications
 */
export declare function useListNotifications<TData = Awaited<ReturnType<typeof listNotifications>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getMarkNotificationReadUrl: (id: number) => string;
/**
 * @summary Mark notification as read
 */
export declare const markNotificationRead: (id: number, options?: RequestInit) => Promise<Notification>;
export declare const getMarkNotificationReadMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markNotificationRead>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof markNotificationRead>>, TError, {
    id: number;
}, TContext>;
export type MarkNotificationReadMutationResult = NonNullable<Awaited<ReturnType<typeof markNotificationRead>>>;
export type MarkNotificationReadMutationError = ErrorType<unknown>;
/**
* @summary Mark notification as read
*/
export declare const useMarkNotificationRead: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markNotificationRead>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof markNotificationRead>>, TError, {
    id: number;
}, TContext>;
export declare const getMarkAllNotificationsReadUrl: () => string;
/**
 * @summary Mark all notifications as read
 */
export declare const markAllNotificationsRead: (options?: RequestInit) => Promise<BulkUpdateResult>;
export declare const getMarkAllNotificationsReadMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markAllNotificationsRead>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof markAllNotificationsRead>>, TError, void, TContext>;
export type MarkAllNotificationsReadMutationResult = NonNullable<Awaited<ReturnType<typeof markAllNotificationsRead>>>;
export type MarkAllNotificationsReadMutationError = ErrorType<unknown>;
/**
* @summary Mark all notifications as read
*/
export declare const useMarkAllNotificationsRead: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof markAllNotificationsRead>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof markAllNotificationsRead>>, TError, void, TContext>;
export declare const getListGeminiConversationsUrl: () => string;
/**
 * @summary List all conversations
 */
export declare const listGeminiConversations: (options?: RequestInit) => Promise<GeminiConversation[]>;
export declare const getListGeminiConversationsQueryKey: () => readonly ["/api/gemini/conversations"];
export declare const getListGeminiConversationsQueryOptions: <TData = Awaited<ReturnType<typeof listGeminiConversations>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGeminiConversations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listGeminiConversations>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListGeminiConversationsQueryResult = NonNullable<Awaited<ReturnType<typeof listGeminiConversations>>>;
export type ListGeminiConversationsQueryError = ErrorType<unknown>;
/**
 * @summary List all conversations
 */
export declare function useListGeminiConversations<TData = Awaited<ReturnType<typeof listGeminiConversations>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGeminiConversations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateGeminiConversationUrl: () => string;
/**
 * @summary Create a new conversation
 */
export declare const createGeminiConversation: (geminiConversationInput: GeminiConversationInput, options?: RequestInit) => Promise<GeminiConversation>;
export declare const getCreateGeminiConversationMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createGeminiConversation>>, TError, {
        data: BodyType<GeminiConversationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createGeminiConversation>>, TError, {
    data: BodyType<GeminiConversationInput>;
}, TContext>;
export type CreateGeminiConversationMutationResult = NonNullable<Awaited<ReturnType<typeof createGeminiConversation>>>;
export type CreateGeminiConversationMutationBody = BodyType<GeminiConversationInput>;
export type CreateGeminiConversationMutationError = ErrorType<unknown>;
/**
* @summary Create a new conversation
*/
export declare const useCreateGeminiConversation: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createGeminiConversation>>, TError, {
        data: BodyType<GeminiConversationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createGeminiConversation>>, TError, {
    data: BodyType<GeminiConversationInput>;
}, TContext>;
export declare const getGetGeminiConversationUrl: (id: number) => string;
/**
 * @summary Get conversation with messages
 */
export declare const getGeminiConversation: (id: number, options?: RequestInit) => Promise<GeminiConversationWithMessages>;
export declare const getGetGeminiConversationQueryKey: (id: number) => readonly [`/api/gemini/conversations/${number}`];
export declare const getGetGeminiConversationQueryOptions: <TData = Awaited<ReturnType<typeof getGeminiConversation>>, TError = ErrorType<GeminiError>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getGeminiConversation>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getGeminiConversation>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetGeminiConversationQueryResult = NonNullable<Awaited<ReturnType<typeof getGeminiConversation>>>;
export type GetGeminiConversationQueryError = ErrorType<GeminiError>;
/**
 * @summary Get conversation with messages
 */
export declare function useGetGeminiConversation<TData = Awaited<ReturnType<typeof getGeminiConversation>>, TError = ErrorType<GeminiError>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getGeminiConversation>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getDeleteGeminiConversationUrl: (id: number) => string;
/**
 * @summary Delete a conversation
 */
export declare const deleteGeminiConversation: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteGeminiConversationMutationOptions: <TError = ErrorType<GeminiError>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteGeminiConversation>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteGeminiConversation>>, TError, {
    id: number;
}, TContext>;
export type DeleteGeminiConversationMutationResult = NonNullable<Awaited<ReturnType<typeof deleteGeminiConversation>>>;
export type DeleteGeminiConversationMutationError = ErrorType<GeminiError>;
/**
* @summary Delete a conversation
*/
export declare const useDeleteGeminiConversation: <TError = ErrorType<GeminiError>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteGeminiConversation>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteGeminiConversation>>, TError, {
    id: number;
}, TContext>;
export declare const getListGeminiMessagesUrl: (id: number) => string;
/**
 * @summary List messages in a conversation
 */
export declare const listGeminiMessages: (id: number, options?: RequestInit) => Promise<GeminiMessage[]>;
export declare const getListGeminiMessagesQueryKey: (id: number) => readonly [`/api/gemini/conversations/${number}/messages`];
export declare const getListGeminiMessagesQueryOptions: <TData = Awaited<ReturnType<typeof listGeminiMessages>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGeminiMessages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listGeminiMessages>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListGeminiMessagesQueryResult = NonNullable<Awaited<ReturnType<typeof listGeminiMessages>>>;
export type ListGeminiMessagesQueryError = ErrorType<unknown>;
/**
 * @summary List messages in a conversation
 */
export declare function useListGeminiMessages<TData = Awaited<ReturnType<typeof listGeminiMessages>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGeminiMessages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSendGeminiMessageUrl: (id: number) => string;
/**
 * @summary Send a message and receive an AI response (SSE stream)
 */
export declare const sendGeminiMessage: (id: number, geminiMessageInput: GeminiMessageInput, options?: RequestInit) => Promise<unknown>;
export declare const getSendGeminiMessageMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendGeminiMessage>>, TError, {
        id: number;
        data: BodyType<GeminiMessageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof sendGeminiMessage>>, TError, {
    id: number;
    data: BodyType<GeminiMessageInput>;
}, TContext>;
export type SendGeminiMessageMutationResult = NonNullable<Awaited<ReturnType<typeof sendGeminiMessage>>>;
export type SendGeminiMessageMutationBody = BodyType<GeminiMessageInput>;
export type SendGeminiMessageMutationError = ErrorType<unknown>;
/**
* @summary Send a message and receive an AI response (SSE stream)
*/
export declare const useSendGeminiMessage: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendGeminiMessage>>, TError, {
        id: number;
        data: BodyType<GeminiMessageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof sendGeminiMessage>>, TError, {
    id: number;
    data: BodyType<GeminiMessageInput>;
}, TContext>;
export declare const getGenerateGeminiImageUrl: () => string;
/**
 * @summary Generate an image from a text prompt
 */
export declare const generateGeminiImage: (geminiImageInput: GeminiImageInput, options?: RequestInit) => Promise<GeminiImageOutput>;
export declare const getGenerateGeminiImageMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateGeminiImage>>, TError, {
        data: BodyType<GeminiImageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof generateGeminiImage>>, TError, {
    data: BodyType<GeminiImageInput>;
}, TContext>;
export type GenerateGeminiImageMutationResult = NonNullable<Awaited<ReturnType<typeof generateGeminiImage>>>;
export type GenerateGeminiImageMutationBody = BodyType<GeminiImageInput>;
export type GenerateGeminiImageMutationError = ErrorType<unknown>;
/**
* @summary Generate an image from a text prompt
*/
export declare const useGenerateGeminiImage: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateGeminiImage>>, TError, {
        data: BodyType<GeminiImageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof generateGeminiImage>>, TError, {
    data: BodyType<GeminiImageInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map