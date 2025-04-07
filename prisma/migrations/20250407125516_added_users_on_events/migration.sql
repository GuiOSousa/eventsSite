-- CreateTable
CREATE TABLE "UsersOnEvents" (
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "UsersOnEvents_pkey" PRIMARY KEY ("userId","eventId")
);

-- AddForeignKey
ALTER TABLE "UsersOnEvents" ADD CONSTRAINT "UsersOnEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnEvents" ADD CONSTRAINT "UsersOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
