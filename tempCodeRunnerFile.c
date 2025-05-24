#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define TOTAL_TIME 120
#define REQUEST_INTERVAL 5
#define TIME_STEP 15

typedef struct
{
    int *queue;
    int front, rear, size, capacity;
    int *arrivalTimes;
} Queue;

void initQueue(Queue *q, int capacity)
{
    q->capacity = capacity;
    q->queue = (int *)malloc(capacity * sizeof(int));
    q->arrivalTimes = (int *)malloc(capacity * sizeof(int));
    q->front = q->rear = q->size = 0;
}

int isQueueFull(Queue *q)
{
    return q->size == q->capacity;
}

int isQueueEmpty(Queue *q)
{
    return q->size == 0;
}

void enqueue(Queue *q, int request, int currentTime)
{
    if (isQueueFull(q))
    {
        printf("Queue is full, cannot enqueue %d\n", request);
        return;
    }
    q->queue[q->rear] = request;
    q->arrivalTimes[q->rear] = currentTime;
    q->rear = (q->rear + 1) % q->capacity;
    q->size++;
}

int dequeue(Queue *q, int *waitTime)
{
    if (isQueueEmpty(q))
    {
        return -1;
    }
    int request = q->queue[q->front];
    *waitTime = (q->arrivalTimes[q->front] - request);
    q->front = (q->front + 1) % q->capacity;
    q->size--;
    return request;
}

void freeQueue(Queue *q)
{
    free(q->queue);
    free(q->arrivalTimes);
}

void simulateAirport()
{
    Queue landingQueue, takeoffQueue;
    int time, landingRequests = 0, takeoffRequests = 0;
    int landingsCompleted = 0, takeoffsCompleted = 0;
    int totalLandingWaitTime = 0, totalTakeoffWaitTime = 0;
    int queueCapacity = 20;

    initQueue(&landingQueue, queueCapacity);
    initQueue(&takeoffQueue, queueCapacity);

    srand(time(NULL));

    for (time = 0; time < TOTAL_TIME; time += REQUEST_INTERVAL)
    {
        // Generate random requests
        if (rand() % 2)
        {
            landingRequests++;
            enqueue(&landingQueue, time, time);
        }
        else
        {
            takeoffRequests++;
            enqueue(&takeoffQueue, time, time);
        }

        // Process landings first
        int waitTime;
        if (!isQueueEmpty(&landingQueue))
        {
            dequeue(&landingQueue, &waitTime);
            landingsCompleted++;
            totalLandingWaitTime += waitTime;
        }
        else if (!isQueueEmpty(&takeoffQueue))
        {
            dequeue(&takeoffQueue, &waitTime);
            takeoffsCompleted++;
            totalTakeoffWaitTime += waitTime;
        }
    }

    printf("Final Queue Contents:\n");
    printf("Landing Queue Size: %d\n", landingQueue.size);
    printf("Takeoff Queue Size: %d\n", takeoffQueue.size);

    printf("Number of Takeoffs Completed: %d\n", takeoffsCompleted);
    printf("Number of Landings Completed: %d\n", landingsCompleted);

    printf("Number of Landing Requests: %d\n", landingRequests);
    printf("Number of Takeoff Requests: %d\n", takeoffRequests);

    printf("Average Minutes Spent in Landing Queue: %.2f\n", landingRequests ? (float)totalLandingWaitTime / landingRequests : 0);
    printf("Average Minutes Spent in Takeoff Queue: %.2f\n", takeoffRequests ? (float)totalTakeoffWaitTime / takeoffRequests : 0);

    freeQueue(&landingQueue);
    freeQueue(&takeoffQueue);
}

int main()
{
    simulateAirport();
    return 0;
}
