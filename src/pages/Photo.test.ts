// firebase가 동작하는 데 필요한 기능을 mocking하는 작업에 많은 에너지가 소비됨.

// File: deleteObject.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteObject, ref as firebaseRef } from 'firebase/storage';
import { storage } from '../firebase';

// Firebase 모듈의 deleteObject 함수를 모의함
vi.mock('firebase/storage', () => ({
  ref: vi.fn(),
  getStorage: vi.fn(),
  deleteObject: vi.fn(),
}));

// deleteFile 함수는 deleteObject를 호출하여 파일을 삭제
async function deleteFile(fileRefPath: string): Promise<void> {
  const fileRef = firebaseRef(storage, fileRefPath);
  await deleteObject(fileRef);
}

describe('Firebase deleteObject 함수 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 모의 함수의 호출 기록을 초기화함
    vi.clearAllMocks();
  });

  it('성공적으로 파일 삭제', async () => {
    // deleteObject 함수가 성공적으로 해결되는 Promise를 반함
    vi.mocked(deleteObject).mockResolvedValue(undefined);

    // 파일 삭제 로직 실행
    await deleteFile('path/to/file');

    // deleteObject 함수가 적절한 인자와 함께 호출되었는지 확인
    expect(deleteObject).toHaveBeenCalledWith(expect.anything());
    expect(deleteObject).toHaveBeenCalledTimes(1);
  });

  it('파일 삭제 실패 - 오류 처리', async () => {
    // deleteObject 함수가 거부되는 Promise를 반환함
    const mockError = new Error('Failed to delete file');
    vi.mocked(deleteObject).mockRejectedValue(mockError);

    try {
      // 파일 삭제 로직 실행
      await deleteFile('path/to/nonexistent/file');
      // 예외가 발생하지 않으면 테스트 실패
      expect(true).toBe(false);
    } catch (error) {
      // 예외 처리를 확인
      expect(error).toEqual(mockError);
    }

    // deleteObject 함수가 적절한 인자와 함께 호출되었는지 확인
    expect(deleteObject).toHaveBeenCalledWith(expect.anything());
    expect(deleteObject).toHaveBeenCalledTimes(1);
  });
});
